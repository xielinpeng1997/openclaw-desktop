#!/bin/bash

# 🚀 OpenClaw GitHub 一键推送脚本
# 作者: Timi
# 为 xielinpeng1997 定制

echo ""
echo "██████╗ ██████╗ ███████╗███╗   ██╗ ██████╗ ██╗      █████╗ ██╗    ██╗"
echo "██╔══██╗██╔══██╗██╔════╝████╗  ██║██╔═══██╗██║     ██╔══██╗██║    ██║"
echo "██████╔╝██████╔╝█████╗  ██╔██╗ ██║██║   ██║██║     ███████║██║ █╗ ██║"
echo "██╔═══╝ ██╔══██╗██╔══╝  ██║╚██╗██║██║   ██║██║     ██╔══██║██║███╗██║"
echo "██║     ██║  ██║███████╗██║ ╚████║╚██████╔╝███████╗██║  ██║╚███╔███╔╝"
echo "╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚══╝╚══╝ "
echo ""
echo "🚀 OpenClaw 桌面客户端 - GitHub 一键推送"
echo "========================================"
echo ""
echo "📊 项目信息："
echo "   用户: xielinpeng1997"
echo "   仓库: openclaw-desktop"
echo "   文件: 16 个文件"
echo "   提交: 3 次提交"
echo "   分支: main"
echo ""
echo "🎯 选择推送方式："
echo ""
echo "1) 🎪 简单模式（推荐）"
echo "   - 自动处理所有步骤"
echo "   - 适合大多数用户"
echo ""
echo "2) 🔧 高级模式"
echo "   - 手动控制每个步骤"
echo "   - 适合开发者"
echo ""
echo "3) 📖 查看指南"
echo "   - 查看详细说明"
echo ""
read -p "请选择 (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo "🎪 简单模式启动..."
        echo ""
        echo "步骤 1: 检查远程仓库..."
        git remote remove origin 2>/dev/null
        
        echo "步骤 2: 请先在浏览器创建仓库："
        echo "        https://github.com/new"
        echo ""
        echo "📋 创建仓库时填写："
        echo "   - Repository name: openclaw-desktop"
        echo "   - Description: OpenClaw桌面客户端 - 完美复制粘贴功能"
        echo "   - Public"
        echo "   - 不要初始化任何文件"
        echo ""
        read -p "创建完成后按回车继续..." dummy
        
        echo ""
        echo "步骤 3: 设置远程仓库..."
        git remote add origin https://github.com/xielinpeng1997/openclaw-desktop.git
        
        echo "步骤 4: 推送代码..."
        echo "⚠️  如果提示需要认证："
        echo "   1. 访问 https://github.com/settings/tokens"
        echo "   2. 生成个人访问令牌（需要 repo 权限）"
        echo "   3. 用令牌代替密码"
        echo ""
        git push -u origin main
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 🎉 🎉 推送成功！ 🎉 🎉 🎉"
            echo ""
            echo "🌐 你的开源项目："
            echo "   https://github.com/xielinpeng1997/openclaw-desktop"
            echo ""
            echo "⭐️ 下一步："
            echo "   1. 访问上面的链接"
            echo "   2. 点个 Star ⭐️"
            echo "   3. 分享给朋友"
            echo "   4. 开始接受贡献！"
        else
            echo ""
            echo "❌ 推送失败"
            echo "   请检查网络和认证"
        fi
        ;;
        
    2)
        echo ""
        echo "🔧 高级模式"
        echo ""
        echo "当前远程仓库："
        git remote -v
        echo ""
        echo "选项："
        echo "a) 使用 HTTPS"
        echo "b) 使用 SSH"
        echo "c) 自定义 URL"
        echo ""
        read -p "选择 (a/b/c): " method
        
        case $method in
            a)
                git remote remove origin 2>/dev/null
                git remote add origin https://github.com/xielinpeng1997/openclaw-desktop.git
                ;;
            b)
                git remote remove origin 2>/dev/null
                git remote add origin git@github.com:xielinpeng1997/openclaw-desktop.git
                ;;
            c)
                read -p "输入远程仓库URL: " custom_url
                git remote remove origin 2>/dev/null
                git remote add origin "$custom_url"
                ;;
            *)
                echo "无效选择"
                exit 1
                ;;
        esac
        
        echo ""
        echo "推送命令："
        echo "git push -u origin main"
        echo ""
        echo "是否立即推送？ (y/n)"
        read -p "> " push_now
        
        if [ "$push_now" = "y" ] || [ "$push_now" = "Y" ]; then
            git push -u origin main
        else
            echo ""
            echo "💡 你可以稍后手动运行："
            echo "   git push -u origin main"
        fi
        ;;
        
    3)
        echo ""
        echo "📖 详细指南"
        echo ""
        echo "1. 创建 GitHub 仓库："
        echo "   访问 https://github.com/new"
        echo ""
        echo "2. 填写信息："
        echo "   - Repository name: openclaw-desktop"
        echo "   - Description: OpenClaw桌面客户端 - 完美复制粘贴功能"
        echo "   - 选择 Public"
        echo "   - 不要初始化任何文件"
        echo ""
        echo "3. 推送代码："
        echo "   git remote add origin https://github.com/xielinpeng1997/openclaw-desktop.git"
        echo "   git push -u origin main"
        echo ""
        echo "4. 需要认证时："
        echo "   使用 GitHub 个人访问令牌"
        echo "   获取：https://github.com/settings/tokens"
        echo ""
        echo "🌐 成功后的地址："
        echo "   https://github.com/xielinpeng1997/openclaw-desktop"
        ;;
        
    *)
        echo "无效选择"
        ;;
esac

echo ""
echo "✨ 脚本执行完成！"
echo "💡 如有问题，查看 ULTIMATE_PUSH.md 文件"