#!/bin/bash

echo "🚀 推送 OpenClaw 到 GitHub"
echo "=========================="
echo ""
echo "GitHub 用户: xielinpeng1997"
echo "仓库名称: openclaw-desktop"
echo ""
echo "请确保："
echo "1. 已在 GitHub 创建仓库"
echo "2. 已登录 GitHub 账户"
echo ""
echo "选择推送方式："
echo "1) HTTPS (需要个人访问令牌)"
echo "2) SSH (需要 SSH 密钥)"
echo "3) 查看详细指南"
echo ""
read -p "请选择 (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo "📤 使用 HTTPS 推送..."
        git remote remove origin 2>/dev/null
        git remote add origin https://github.com/xielinpeng1997/openclaw-desktop.git
        git push -u origin main
        ;;
    2)
        echo ""
        echo "📤 使用 SSH 推送..."
        git remote remove origin 2>/dev/null
        git remote add origin git@github.com:xielinpeng1997/openclaw-desktop.git
        git push -u origin main
        ;;
    3)
        echo ""
        echo "📖 详细指南："
        echo "请查看 FINAL_GITHUB_SETUP.md 文件"
        cat FINAL_GITHUB_SETUP.md | head -30
        ;;
    *)
        echo "无效选择"
        ;;
esac

echo ""
echo "🌐 你的仓库地址："
echo "   https://github.com/xielinpeng1997/openclaw-desktop"