#!/bin/bash

echo "🚀 使用 GitHub CLI 上传 OpenClaw"
echo "================================"
echo ""
echo "GitHub 用户: xielinpeng1997"
echo "仓库名称: openclaw-desktop"
echo ""
echo "步骤 1: 登录 GitHub"
echo "------------------"
echo "请按照以下步骤操作："
echo ""
echo "1. 运行: gh auth login"
echo "2. 选择: GitHub.com"
echo "3. 选择: HTTPS"
echo "4. 认证方式: 使用浏览器登录"
echo "5. 授权 GitHub CLI"
echo ""
read -p "按回车键开始登录..." dummy

# 登录 GitHub
gh auth login

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 登录成功！"
    echo ""
    echo "步骤 2: 创建仓库并推送"
    echo "----------------------"
    
    # 创建仓库并推送
    gh repo create openclaw-desktop \
        --public \
        --description "OpenClaw桌面客户端 - 完美复制粘贴功能" \
        --source=. \
        --remote=origin \
        --push
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "🎉 恭喜！项目已成功上传到 GitHub！"
        echo ""
        echo "🌐 仓库地址："
        echo "   https://github.com/xielinpeng1997/openclaw-desktop"
        echo ""
        echo "📋 包含的文件："
        find . -type f -not -path './.git/*' -not -path './node_modules/*' -not -path './dist/*' | head -15
        echo ""
        echo "💡 下一步："
        echo "   1. 访问上面的链接查看仓库"
        echo "   2. 分享给你的朋友和同事"
        echo "   3. 可以设置 GitHub Pages 展示项目"
    else
        echo ""
        echo "❌ 创建仓库失败，可能的原因："
        echo "   1. 仓库已存在"
        echo "   2. 网络问题"
        echo "   3. 权限不足"
        echo ""
        echo "💡 尝试手动创建："
        echo "   访问 https://github.com/new 创建仓库"
    fi
else
    echo ""
    echo "❌ 登录失败"
    echo "   请检查网络连接和 GitHub 账户"
fi