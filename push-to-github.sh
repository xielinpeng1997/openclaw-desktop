#!/bin/bash

echo "🚀 OpenClaw 桌面客户端 - GitHub 上传脚本"
echo "========================================"
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

echo "📦 项目信息："
echo "   项目名称: openclaw-desktop"
echo "   文件数量: $(find . -type f -not -path './.git/*' -not -path './node_modules/*' | wc -l)"
echo "   仓库大小: $(du -sh . | cut -f1)"
echo ""

# 询问 GitHub 用户名
read -p "请输入你的 GitHub 用户名: " github_username

if [ -z "$github_username" ]; then
    echo "❌ 错误：需要 GitHub 用户名"
    exit 1
fi

echo ""
echo "🔗 设置远程仓库..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/${github_username}/openclaw-desktop.git"

echo "📤 推送代码到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 推送成功！"
    echo ""
    echo "🌐 你的仓库地址："
    echo "   https://github.com/${github_username}/openclaw-desktop"
    echo ""
    echo "📋 下一步："
    echo "   1. 访问上面的链接查看仓库"
    echo "   2. 可以分享给其他人"
    echo "   3. 如果需要，可以设置 GitHub Pages 或 Actions"
else
    echo ""
    echo "❌ 推送失败，可能的原因："
    echo "   1. 仓库尚未在 GitHub 创建"
    echo "   2. 网络问题"
    echo "   3. 权限问题"
    echo ""
    echo "💡 手动创建仓库步骤："
    echo "   1. 访问 https://github.com/new"
    echo "   2. 仓库名: openclaw-desktop"
    echo "   3. 描述: OpenClaw桌面客户端 - 完美复制粘贴功能"
    echo "   4. 选择 Public"
    echo "   5. 不要初始化 README/.gitignore/license"
    echo "   6. 创建后按照提示推送"
fi