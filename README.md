# OpenClaw Desktop Client

一个功能完整的 OpenClaw 桌面客户端，支持完美的复制粘贴功能。

![OpenClaw Logo](icon.png)

## ✨ 功能特性

- ✅ **完美复制粘贴支持** - 多层剪贴板回退机制
- ✅ **自定义应用图标** - 美观的应用图标
- ✅ **标准 macOS 窗口** - 原生窗口体验
- ✅ **预加载脚本优化** - 增强的剪贴板功能
- ✅ **一键打包安装** - 支持 DMG 和 ZIP 分发

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发运行
```bash
npm start
```

### 打包应用
```bash
# 打包 macOS 应用
npm run dist:mac

# 打包所有平台
npm run dist
```

## 📦 项目结构

```
openclaw-desktop/
├── main-only-drag-fix.js      # 主应用文件
├── preload.js                 # 预加载脚本（剪贴板功能）
├── icon.png                   # 应用图标
├── loading.html               # 加载页面
├── package.json               # 项目配置
├── README.md                  # 项目说明
└── .gitignore                 # Git 忽略配置
```

## 🔧 技术栈

- **Electron** - 桌面应用框架
- **Node.js** - 后端运行时
- **HTML/CSS/JS** - 前端界面

## 🎯 使用场景

1. **OpenClaw 桌面客户端** - 替代网页版，获得更好的桌面体验
2. **剪贴板增强工具** - 解决 Electron 应用复制粘贴问题
3. **自定义桌面应用** - 基于 Electron 的快速开发模板

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

如有问题或建议，请通过 GitHub Issues 联系。