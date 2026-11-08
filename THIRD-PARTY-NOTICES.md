# Magical Cube 第三方声明

Magical Cube 原创部分遵循根目录 LICENSE 中的 MIT 许可。以下声明与完整许可随源码和安装包保留。

## 参考及适配源码

- **With Keyline**：块边界分析、插入规划和避让折叠按钮的定位算法。Copyright (c) 2026 Charlie，MIT；[完整许可](licenses/with-keyline-MIT.txt)。
- **Obsidian Notion Flow**：表格网格选择、分栏编辑和渲染清理方式的实现参考。Copyright (c) 2026 Xin，MIT；[完整许可](licenses/notion-flow-MIT.txt)。
- **Slash Commander**：参考命令分组、显隐与排序交互；未带入 React、Zustand 或通用命令树。
- **Editing Toolbar / Note Toolbar**：仅参考操作条及常用栏交互，未复制其 MPL / GPL 运行时代码。
- **飞书**：用户提供页面和截图作为交互、排版参考；未复制飞书源代码、品牌图标或素材。

## main.js 中打包的 MIT 库

| 包 | 打包版本 | 许可 | 声明 |
| --- | --- | --- | --- |
| @lezer/common | 1.5.4 | MIT | [完整许可](licenses/lezer-common-MIT.txt) |
| @lezer/highlight | 1.2.5 | MIT | [完整许可](licenses/lezer-highlight-MIT.txt) |
| @lezer/markdown | 1.8.0 | MIT | [完整许可](licenses/lezer-markdown-MIT.txt) |
| @codemirror/commands | 6.8.1 | MIT | [完整许可](licenses/codemirror-commands-MIT.txt) |
| @codemirror/autocomplete | 6.20.4 | MIT | [完整许可](licenses/codemirror-autocomplete-MIT.txt) |
| @lezer/lr | 1.4.11 | MIT | [完整许可](licenses/lezer-lr-MIT.txt) |
| @lezer/html | 1.3.13 | MIT | [完整许可](licenses/lezer-html-MIT.txt) |
| @lezer/css | 1.3.9 | MIT | [完整许可](licenses/lezer-css-MIT.txt) |
| @codemirror/lang-css | 6.3.1 | MIT | [完整许可](licenses/codemirror-lang-css-MIT.txt) |
| @lezer/javascript | 1.5.6 | MIT | [完整许可](licenses/lezer-javascript-MIT.txt) |
| @codemirror/lang-javascript | 6.2.5 | MIT | [完整许可](licenses/codemirror-lang-javascript-MIT.txt) |
| @codemirror/lang-html | 6.4.12 | MIT | [完整许可](licenses/codemirror-lang-html-MIT.txt) |
| @codemirror/lang-markdown | 6.3.3 | MIT | [完整许可](licenses/codemirror-lang-markdown-MIT.txt) |

Obsidian API 和 CodeMirror 的 state、view、language 由 Obsidian 宿主提供，不另打包第二份编辑器运行时。TypeScript、esbuild、tsx、JSDOM 和 Node 类型用于开发、构建或测试，不作为 Cube 运行时安装文件。

## 可选配套插件

Home 与 Magical Cards 是独立插件，本公开发行版不包含它们的代码或运行文件。卡片集成需要相应插件已启用并提供兼容 API；它们各自保留原许可，不受 Cube 的 MIT 许可覆盖。
