#!/bin/bash

echo "🔧 清除系统代理环境变量并安装"
echo "================================"
echo ""

# 临时清除当前 shell 的代理环境变量
unset http_proxy
unset https_proxy
unset HTTP_PROXY
unset HTTPS_PROXY
unset all_proxy
unset ALL_PROXY

echo "1. 已清除当前 shell 的代理环境变量"
echo ""

# 验证环境变量已清除
echo "2. 验证代理环境变量："
if env | grep -i proxy; then
    echo "⚠️  警告：仍有代理环境变量"
else
    echo "✅ 无代理环境变量"
fi
echo ""

# 获取当前用户
CURRENT_USER=$(whoami)

# 修复权限
echo "3. 修复 npm 权限..."
sudo chown -R $CURRENT_USER:staff /usr/local/lib/node_modules 2>/dev/null
sudo chown -R $CURRENT_USER:staff /usr/local/bin 2>/dev/null
sudo chown -R $CURRENT_USER:staff ~/.npm 2>/dev/null
sudo chown -R $CURRENT_USER:staff ~/.npmrc 2>/dev/null

echo "✅ 权限修复完成"
echo ""

# 清除 npm 代理配置
echo "4. 清除 npm 代理配置..."
npm config delete proxy 2>/dev/null
npm config delete https-proxy 2>/dev/null
npm config delete http-proxy 2>/dev/null

echo "✅ npm 代理配置已清除"
echo ""

# 设置镜像源
echo "5. 设置淘宝镜像源..."
npm config set registry https://registry.npmmirror.com
echo "  当前镜像源: $(npm config get registry)"
echo ""

# 清理
echo "6. 清理缓存和旧文件..."
cd /Users/chenyaokai/work/the_past
rm -rf node_modules package-lock.json 2>/dev/null
npm cache clean --force 2>/dev/null

echo "✅ 清理完成"
echo ""

# 测试网络
echo "7. 测试网络连接..."
if curl -I --max-time 5 https://registry.npmmirror.com 2>/dev/null | head -1; then
    echo "✅ 网络连接正常"
else
    echo "❌ 网络连接失败"
    exit 1
fi
echo ""

# 安装依赖
echo "8. 开始安装依赖..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm install  --verbose --loglevel=verbose

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查结果
if [ -d "node_modules" ] && [ "$(ls -A node_modules 2>/dev/null)" ]; then
    echo "🎉 安装成功！"
    echo ""
    echo "现在可以运行："
    echo "  npm run dev"
    echo ""
else
    echo "❌ 安装失败，请查看上面的错误信息"
    echo ""
fi

