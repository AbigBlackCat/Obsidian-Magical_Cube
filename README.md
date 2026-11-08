<h1 align="center">
  <img src="assets/magical-cube.svg" alt="" width="40" height="40" />
  Magical Cube
</h1>

<p align="center">让内容块与卡片，自然融入 Obsidian 写作。</p>

<p align="center">
  <a href="https://github.com/AbigBlackCat/Obsidian-Magical_Cube/releases"><img src="https://img.shields.io/badge/version-0.3.1-3b82f6" alt="Version 0.3.1" /></a>
  <img src="https://img.shields.io/badge/Obsidian-1.13.7%2B-7c3aed" alt="Obsidian 1.13.7 or later" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-64748b" alt="MIT license" /></a>
</p>

<p align="center"><strong>简体中文</strong> · <a href="README_en.md">English</a></p>
<p align="center"><a href="#功能">功能</a> · <a href="#快速开始">快速开始</a> · <a href="#安装与更新">安装与更新</a> · <a href="#编辑模式">编辑模式</a> · <a href="https://github.com/AbigBlackCat/Obsidian-Magical_Cube/releases">下载</a></p>

---

Magical Cube 是一款面向 **Obsidian 桌面端**的编辑插件。点击正文行旁的 `+`，或按下 `⌘/Ctrl + Shift + Space`，即可打开插入面板：添加常用内容块、链接笔记，或插入已有的 Home 卡片与 Magical Cards 模块。

默认启用 **Easy mode**，让你直接编辑渲染后的内容；也可切换至 **God mode**，保留熟悉的 Markdown 编辑体验。

## 功能

| 功能 | 可以做什么 |
| --- | --- |
| 内容块插入 | 插入高亮块、引用、代码和原生 Markdown 表格；高亮块可调整文字、边框、背景与图标。 |
| 灵活分栏 | 创建 2–5 栏，拖动分隔线调整宽度，单独编辑列内容；窄面板中自动纵向排列。 |
| 划词工具条 | 选中文字即可设置格式、颜色、链接、对齐与缩进，或添加本地评论。 |
| 笔记链接 | 按标题、路径或别名搜索同库笔记，插入原生双链，沿用反向链接与重命名更新。 |
| 卡片连接 | 在正文中使用已有 Home 卡片与 Magical Cards 模块，沿用各自的渲染器与数据。 |
| 常用卡片栏 | 固定常用功能、卡片和模块，调整显示名称与顺序；支持功能显隐和来源筛选。 |

## 快速开始

1. [安装并启用插件](#安装与更新)，打开一篇笔记，进入**实时预览**。
2. 点击正文行旁的 `+`，或按 `⌘/Ctrl + Shift + Space` 打开 Magical Cube。
3. 选择内容块开始写作，也可以先选中文字，再用划词工具条调整格式。

在 **设置 → Magical Cube** 中，可以调整常用卡片栏、切换编辑模式，以及开启可选的 `/` 触发。`/` 触发默认关闭。

快捷键可在 Obsidian 的**设置 → 快捷键**中搜索「打开 Magical Cube」修改。`Mod` 在 macOS 上对应 `⌘`，在 Windows / Linux 上对应 `Ctrl`。

## 安装与更新

需要 **Obsidian 1.13.7 或更新版本**，目前仅支持桌面端。

### 手动安装

1. 前往 [Releases](https://github.com/AbigBlackCat/Obsidian-Magical_Cube/releases)，下载附件中的 `main.js`、`manifest.json` 和 `styles.css`。
2. 将这三个文件放入笔记库的 `.obsidian/plugins/magical-cube/` 目录。许可声明已包含在 `main.js` 中，也可在本仓库查阅。
3. 重启 Obsidian 或重新加载插件，在**设置 → 社区插件**中启用 **Magical Cube**。

安装后的运行文件结构：

```text
.obsidian/plugins/magical-cube/
├── main.js
├── manifest.json
└── styles.css
```

### 更新已有安装

先关闭 Magical Cube，用新版本替换上述三个运行文件，再重新启用。**保留原有 `data.json`、笔记、卡片资料及相关插件的数据目录**；更新插件不需要删除它们。建议在更新前备份笔记库。

版本变更见 [更新日志](CHANGELOG.md)，也可在插件的**关于 → 更新日志**中查看。

## 编辑模式

| 模式 | 编辑体验 |
| --- | --- |
| **Easy mode · 默认** | 在实时预览中直接编辑渲染后的内容；高亮块、引用、代码和表格可在块内编辑。 |
| **God mode** | 保留 Markdown 编辑；高亮块保持预览，点击右上角「编辑区块」进入源码。 |

在**设置 → Magical Cube → 编辑体验**中切换，也可以运行「切换 Easy / God mode」命令。两种模式使用同一份 Markdown 笔记。

## 卡片兼容与数据

**基础功能可以独立使用。** Home 与 Magical Cards 连接是可选功能，需要相应插件已启用，并具备 Cube 所需的兼容 API。普通公开版本或相同版本号的安装包，未必包含这些接口；请以 Cube 设置中的连接状态为准。

插入的卡片继续使用原插件的数据。多个 Home 引用共享原卡片配置与数据；删除正文中的引用不会删除原卡片。更新 Cube 时，无需清空 Home 或 Magical Cards 的配置。

高亮块使用原生 Callout，表格使用原生 Markdown，笔记链接使用原生双链。分栏通过 Markdown 注释保存边界；停用 Cube 后，列内正文仍可顺序阅读，分栏布局与卡片显示则需要相应插件。

Home 与 Magical Cards 各自保留原许可，不受 Cube 的 MIT 许可覆盖。详见 [第三方声明](THIRD-PARTY-NOTICES.md)。

## 反馈与支持

遇到问题或有功能建议，欢迎提交 [Issue](https://github.com/AbigBlackCat/Obsidian-Magical_Cube/issues)。请附上 Obsidian 与 Cube 版本、编辑模式及复现步骤。

作者：[AbigBlackCat](https://github.com/AbigBlackCat) · 如果 Magical Cube 对你有帮助，可以通过 [Ko-fi](https://ko-fi.com/ffbarry) 支持后续开发。

## 许可与源码

Magical Cube 原创部分采用 [MIT 许可](LICENSE)。

**本仓库用于发布文档与构建后的插件安装包。开发源码保存在私有仓库，目前未公开。** 第三方组件与配套插件的许可见 [第三方声明](THIRD-PARTY-NOTICES.md)。
