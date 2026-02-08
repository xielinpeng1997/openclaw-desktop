#!/bin/bash

echo "🚀 OpenClaw 桌面客户端打包脚本"
echo "========================================"
echo ""

# 检查图标文件
if [ -f "icon.png" ]; then
    echo "✅ 找到应用图标: icon.png (2048x2048)"
else
    echo "❌ 未找到图标文件 icon.png"
    echo "   请将图标文件放在项目根目录"
    exit 1
fi

# 检查主文件
if [ -f "main-only-drag-fix.js" ]; then
    echo "✅ 找到主应用文件: main-only-drag-fix.js"
else
    echo "❌ 未找到主应用文件"
    exit 1
fi

echo ""
echo "📦 开始打包 OpenClaw 桌面客户端..."
echo "   目标平台: macOS"
echo "   应用名称: OpenClaw"
echo "   应用图标: icon.png"
echo ""

# 打包 macOS 应用
echo "🔄 正在打包 macOS 应用 (DMG/ZIP)..."
npm run dist:mac

echo ""
echo "📁 打包完成！应用文件在: dist/"
echo ""
echo "📋 生成的文件:"
ls -la dist/mac/ 2>/dev/null || echo "正在生成中，请稍后查看 dist/ 目录"

echo ""
echo "🎉 打包完成！"
echo "💡 你可以将生成的应用文件分发给其他用户安装使用"