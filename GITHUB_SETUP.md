# GitHub 上传指南

## 步骤 1：在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 填写信息：
   - **Repository name**: `openclaw-desktop`
   - **Description**: `OpenClaw桌面客户端 - 完美复制粘贴功能`
   - **Public** (选择公开)
   - **不要**勾选：
     - ✅ Initialize this repository with a README
     - ✅ Add .gitignore
     - ✅ Choose a license
3. 点击 "Create repository"

## 步骤 2：推送代码

创建仓库后，GitHub 会显示如下命令：

```bash
# 在项目目录中运行这些命令：
git remote add origin https://github.com/你的用户名/openclaw-desktop.git
git branch -M main
git push -u origin main
```

或者运行我们提供的脚本：

```bash
./push-to-github.sh
```

然后输入你的 GitHub 用户名。

## 步骤 3：验证上传

访问你的仓库：
```
https://github.com/你的用户名/openclaw-desktop
```

应该能看到以下文件：
- `README.md` - 项目说明
- `main-only-drag-fix.js` - 主应用文件
- `preload.js` - 预加载脚本
- `package.json` - 项目配置
- `icon.png` - 应用图标
- 其他项目文件

## 项目特点

✅ **已准备好上传**：
- Git 仓库已初始化
- 提交了所有必要文件
- 创建了 .gitignore
- 编写了完整的 README

✅ **功能完整**：
- 完美复制粘贴支持
- 自定义应用图标
- 打包配置
- 完整文档

现在你的 OpenClaw 桌面客户端已经可以分享给全世界了！ 🎉