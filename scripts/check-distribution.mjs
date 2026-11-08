import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {mkdtemp, mkdir, readFile, readdir, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const required = [
  'README.md', 'README_en.md', 'CHANGELOG.md', 'LICENSE', 'THIRD-PARTY-NOTICES.md',
  'manifest.json', 'versions.json', 'assets/magical-cube.svg', '.gitignore',
  '.github/workflows/ci.yml', 'scripts/check-distribution.mjs',
  'licenses/with-keyline-MIT.txt', 'licenses/notion-flow-MIT.txt',
];
const allowed = new Set(required);
const directories = new Set(['.github', '.github/workflows', 'scripts', 'licenses', 'assets']);
const releaseFiles = ['main.js', 'manifest.json', 'styles.css'];
const isVersion = value => typeof value === 'string' && /^\d+\.\d+\.\d+$/.test(value);

function checkText(text, name) {
  if (/\/(?:Users|home)\/[^\s/]+|[A-Z]:[\\/]Users[\\/]/i.test(text)) throw new Error(`Personal local path in ${name}.`);
  if (/\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|AKIA[A-Z0-9]{16}|sk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{20,})|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|Authorization\s*[:=]\s*["']?Bearer\s+[A-Za-z0-9._-]{12,}/i.test(text)) throw new Error(`Possible secret in ${name}.`);
  if (/[#@]\s*sourceMappingURL\s*=/.test(text)) throw new Error(`Source map reference in ${name}.`);
}

export async function checkDistribution(directory, {assets, tag} = {}) {
  const root = resolve(directory), files = [];
  async function walk(relative = '') {
    for (const entry of await readdir(join(root, relative), {withFileTypes: true})) {
      if (!relative && entry.name === '.git') continue;
      const name = relative ? `${relative}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        if (!directories.has(name)) throw new Error(`Non-distribution directory: ${name}.`);
        await walk(name);
      } else {
        if (!entry.isFile() || (!allowed.has(name) && !/^licenses\/[^/]+\.txt$/.test(name))) throw new Error(`Non-distribution file: ${name}.`);
        const text = await readFile(join(root, name), 'utf8');
        if (!text.trim()) throw new Error(`Empty distribution file: ${name}.`);
        checkText(text, name);
        files.push(name);
      }
    }
  }
  await walk();
  for (const name of required) if (!files.includes(name)) throw new Error(`Missing distribution file: ${name}.`);
  const manifestBytes = await readFile(join(root, 'manifest.json'));
  const manifest = JSON.parse(manifestBytes.toString('utf8'));
  const versions = JSON.parse(await readFile(join(root, 'versions.json'), 'utf8'));
  if (!manifest || manifest.id !== 'magical-cube' || typeof manifest.name !== 'string' || !manifest.name.trim() || typeof manifest.description !== 'string' || !manifest.description.trim() || !isVersion(manifest.version) || !isVersion(manifest.minAppVersion) || !versions || Array.isArray(versions) || typeof versions !== 'object' || versions[manifest.version] !== manifest.minAppVersion) throw new Error('Invalid manifest or versions.json metadata.');
  if (Object.entries(versions).some(([version, minimum]) => !isVersion(version) || !isVersion(minimum))) throw new Error('Invalid versions.json entry.');
  if (tag !== undefined && tag !== manifest.version) throw new Error('Release tag does not match the manifest version.');
  const hashes = {};
  if (assets !== undefined) {
    const entries = await readdir(resolve(assets), {withFileTypes: true});
    if (entries.some(entry => !entry.isFile()) || entries.map(entry => entry.name).sort().join('\n') !== [...releaseFiles].sort().join('\n')) throw new Error('Release assets must be exactly main.js, manifest.json and styles.css.');
    for (const name of releaseFiles) {
      const bytes = await readFile(join(assets, name));
      if (!bytes.length) throw new Error(`Empty release asset: ${name}.`);
      const text = bytes.toString('utf8');
      checkText(text, name);
      if (name === 'manifest.json' && !bytes.equals(manifestBytes)) throw new Error('Release manifest differs from the public manifest.');
      if (name === 'main.js') {
        if (/\bsourcesContent\b/.test(text)) throw new Error('Source map content in main.js.');
        const banner = /^\/\*[\s\S]*?\*\//.exec(text)?.[0] ?? '';
        for (const license of ['LICENSE', ...files.filter(file => file.startsWith('licenses/')).sort()]) {
          if (!banner.includes((await readFile(join(root, license), 'utf8')).trim())) throw new Error(`Release banner is missing ${license}.`);
        }
      }
      hashes[name] = createHash('sha256').update(bytes).digest('hex');
    }
  }
  return {version: manifest.version, files: files.length, hashes};
}

async function selfTest() {
  const temp = await mkdtemp(join(tmpdir(), 'magical-cube-distribution-'));
  const root = join(temp, 'public'), assets = join(temp, 'assets');
  const manifest = `${JSON.stringify({id: 'magical-cube', name: 'Magical Cube', version: '0.3.1', minAppVersion: '1.13.7', description: 'Example plugin.'})}\n`;
  const license = 'MIT License\nCopyright (c) Example\n';
  const withKeyline = 'MIT License\nCopyright (c) With Keyline fixture\n';
  const notionFlow = 'MIT License\nCopyright (c) Notion Flow fixture\n';
  const main = `/*\n${license}\n${withKeyline}\n${notionFlow}\n*/\nmodule.exports = {};\n`;
  let checks = 0;
  async function put(base, name, content) {
    await mkdir(dirname(join(base, name)), {recursive: true});
    await writeFile(join(base, name), content);
  }
  async function rejectsChange(base, name, value, pattern) {
    let previous;
    try { previous = await readFile(join(base, name)); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    try {
      await put(base, name, value);
      await assert.rejects(checkDistribution(root, {assets, tag: '0.3.1'}), pattern);
      checks++;
    } finally {
      if (previous === undefined) await rm(join(base, name));
      else await put(base, name, previous);
    }
  }
  try {
    for (const name of required) await put(root, name, `Public fixture ${name}\n`);
    await put(root, 'scripts/check-distribution.mjs', await readFile(fileURLToPath(import.meta.url), 'utf8'));
    await put(root, 'LICENSE', license);
    await put(root, 'licenses/with-keyline-MIT.txt', withKeyline);
    await put(root, 'licenses/notion-flow-MIT.txt', notionFlow);
    await put(root, 'manifest.json', manifest);
    await put(root, 'versions.json', '{"0.3.1":"1.13.7"}\n');
    await put(assets, 'main.js', main);
    await put(assets, 'manifest.json', manifest);
    await put(assets, 'styles.css', '.cube {}\n');
    const result = await checkDistribution(root, {assets, tag: '0.3.1'});
    assert.equal(result.version, '0.3.1');
    assert.deepEqual(Object.keys(result.hashes).sort(), [...releaseFiles].sort());
    checks++;
    await rejectsChange(root, 'src/main.ts', 'private source', /Non-distribution directory/);
    await rm(join(root, 'src'), {recursive: true});
    await rejectsChange(root, 'main.js', 'bundle', /Non-distribution file/);
    await rejectsChange(root, 'versions.json', '{"0.3.1":"1.0.0"}', /metadata/);
    await rejectsChange(root, 'manifest.json', manifest.replace('magical-cube', 'wrong-id'), /metadata/);
    await rejectsChange(root, 'manifest.json', manifest.replace('Example plugin.', ''), /metadata/);
    await assert.rejects(checkDistribution(root, {tag: '0.3.0'}), /tag/); checks++;
    await rejectsChange(assets, 'manifest.json', `${manifest}\n`, /manifest differs/);
    await rejectsChange(assets, 'main.js.map', '{}', /exactly/);
    await rejectsChange(assets, 'styles.css', '', /Empty release asset/);
    await rejectsChange(assets, 'main.js', 'module.exports = {};', /banner/);
    await rejectsChange(assets, 'main.js', `${main}\n//# ${'sourceMapping' + 'URL'}=main.js.map`, /Source map/);
    await rejectsChange(assets, 'main.js', `${main}\n${'sources' + 'Content'}: []`, /Source map/);
    await rejectsChange(assets, 'main.js', `${main}\n/${'Users'}/example/private`, /Personal local path/);
    await rejectsChange(root, 'README.md', `gh${'p_'}${'a'.repeat(30)}`, /Possible secret/);
    await rm(join(root, 'README.md'));
    await assert.rejects(checkDistribution(root), /Missing distribution file/); checks++;
    return {selfTest: 'passed', checks};
  } finally {
    await rm(temp, {recursive: true, force: true});
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  let result;
  if (args.length === 1 && args[0] === '--self-test') result = await selfTest();
  else {
    const directory = args.shift(), options = {};
    if (!directory || directory.startsWith('--')) throw new Error('Usage: node scripts/check-distribution.mjs <public-directory> [--assets <directory>] [--tag <version>] | --self-test');
    while (args.length) {
      const option = args.shift(), value = args.shift();
      if (!['--assets', '--tag'].includes(option) || !value || value.startsWith('--') || options[option.slice(2)] !== undefined) throw new Error('Expected --assets <directory> or --tag <version>, each at most once.');
      options[option.slice(2)] = value;
    }
    result = await checkDistribution(directory, options);
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
