<h1 align="center">
  <img src="assets/magical-cube.svg" alt="" width="40" height="40" />
  Magical Cube
</h1>

<p align="center">Bring content blocks and cards into your Obsidian writing flow.</p>

<p align="center">
  <a href="https://github.com/AbigBlackCat/Obsidian-Magical_Cube/releases"><img src="https://img.shields.io/badge/version-0.3.5-3b82f6" alt="Version 0.3.5" /></a>
  <img src="https://img.shields.io/badge/Obsidian-1.13.7%2B-7c3aed" alt="Obsidian 1.13.7 or later" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-64748b" alt="MIT license" /></a>
</p>

<p align="center"><a href="README.md">简体中文</a> · <strong>English</strong></p>
<p align="center"><a href="#features">Features</a> · <a href="#quick-start">Quick start</a> · <a href="#installation-and-updates">Installation</a> · <a href="#editing-modes">Editing modes</a> · <a href="https://github.com/AbigBlackCat/Obsidian-Magical_Cube/releases">Download</a></p>

---

Magical Cube is an editing plugin for **Obsidian on desktop**. Click the `+` beside a line, or press `⌘/Ctrl + Shift + Space`, to open the insertion panel. Add common content blocks and link notes. Connections to Home cards and Magical Cards modules are experimental and off by default.

**Easy mode** is enabled by default, letting you edit rendered content directly. Switch to **God mode** for a familiar Markdown editing experience.

## Features

| Feature | What you can do |
| --- | --- |
| Content blocks | Insert highlight blocks, quotes, code, and native Markdown tables. Customize highlight text, borders, backgrounds, and icons. |
| Flexible columns | Create 2–5 columns with an editable overall title and left, center, or right title alignment, saved in the note. Resize columns by dragging dividers and edit them separately. Narrow panes stack columns vertically. |
| Selection toolbar | Select text to change formatting, colors, links, alignment, and indentation, or add a local comment. |
| Note links | Search vault notes by title, path, or alias. Insert native wikilinks that retain backlinks and rename updates. |
| Card connections · Experimental | Off by default. Enable Home / Magical Cards under About → Experimental features. Compatible companion plugins are required; further development is pending. |
| Favorites | Pin frequently used features, plus cards and modules from enabled connections. Adjust names and order, hide features, and filter by source. |

## Quick start

1. [Install and enable the plugin](#installation-and-updates), open a note, and enter **Live Preview**.
2. Click the `+` beside a line, or press `⌘/Ctrl + Shift + Space`, to open Magical Cube.
3. Choose a content block and start writing, or select some text to use the selection toolbar.

Under **Settings → Magical Cube**, customize favorites, switch editing modes, or enable the optional `/` trigger. The `/` trigger is off by default.

To change the shortcut, search for “打开 Magical Cube” in Obsidian's **Settings → Hotkeys**. `Mod` means `⌘` on macOS and `Ctrl` on Windows / Linux.

## Installation and updates

Requires **Obsidian 1.13.7 or later**. Desktop only.

### Manual installation

1. Open [Releases](https://github.com/AbigBlackCat/Obsidian-Magical_Cube/releases) and download the three attached files: `main.js`, `manifest.json`, and `styles.css`.
2. Put these files in your vault's `.obsidian/plugins/magical-cube/` directory. License notices are included in `main.js` and are also available in this repository.
3. Restart Obsidian or reload plugins, then enable **Magical Cube** under **Settings → Community plugins**.

The runtime files should be arranged as follows:

```text
.obsidian/plugins/magical-cube/
├── main.js
├── manifest.json
└── styles.css
```

### Updating an existing installation

Disable Magical Cube, replace the three runtime files above with the new version, and enable it again. **Keep your existing `data.json`, notes, card files, and related plugins' data directories.** An update does not require deleting them. Back up your vault before updating.

See the [changelog](CHANGELOG.md) for version details, or open **About → Changelog** in the plugin settings.

## Editing modes

| Mode | Editing experience |
| --- | --- |
| **Easy mode · Default** | Edit rendered content directly in Live Preview. Highlight blocks, quotes, code, and tables support editing inside the block. |
| **God mode** | Keep Markdown editing. Highlight blocks remain rendered until you click “编辑区块” (Edit block) in the upper-right corner. |

Switch under **Settings → Magical Cube → Editing experience**, or run the “切换 Easy / God mode” command. Both modes use the same Markdown note. Interface and command labels may appear in Chinese.

## Card compatibility and data

**Core features work independently.** Home and Magical Cards connections are experimental and **off by default**. Their switches are available only under **Settings → Magical Cube → About → Experimental features** (“关于 → 实验功能”). Both require compatible companion plugins; further development is pending.

Each companion plugin must be enabled and provide the API required by Cube. A standard public release, or even a package with the same version number, may not include these interfaces. Check the connection status beside each switch. Disabled connections are hidden from the insertion panel, feature management, and available favorites; existing note content, card data, and saved pins are preserved.

Inserted cards continue to use their original plugin's data. Multiple Home references share the original card's configuration and data; removing a reference from a note does not delete the original card. Updating Cube does not require clearing Home or Magical Cards settings.

Highlight blocks use native Callouts, tables use native Markdown, and note links use native wikilinks. Column boundaries, titles, and title alignment are stored in Markdown comments. Reading view displays the saved title and alignment. With Cube disabled, column content remains readable in sequence; column layouts and cards require the relevant plugins to render.

Home and Magical Cards retain their own licenses and are not covered by Cube's MIT license. See [third-party notices](THIRD-PARTY-NOTICES.md).

## Feedback and support

Report bugs or suggest features through [Issues](https://github.com/AbigBlackCat/Obsidian-Magical_Cube/issues). Include your Obsidian and Cube versions, editing mode, and steps to reproduce the problem.

Created by [AbigBlackCat](https://github.com/AbigBlackCat). If Magical Cube helps your work, you can support development on [Ko-fi](https://ko-fi.com/ffbarry).

## License and source availability

Original Magical Cube components are licensed under the [MIT license](LICENSE).

**This repository distributes documentation and built plugin releases. Development source is kept in a private repository and is not currently public.** See [third-party notices](THIRD-PARTY-NOTICES.md) for dependencies and companion plugin licenses.
