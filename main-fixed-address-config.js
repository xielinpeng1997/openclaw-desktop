// OpenClaw 桌面客户端 - 修复地址配置版（解决输入框问题）
const { app, BrowserWindow, Menu, nativeImage, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let mainWindow;

// 默认地址
const DEFAULT_ADDRESS = 'http://127.0.0.1:18789/';

// 配置文件路径
const configPath = path.join(app.getPath('userData'), 'openclaw-address.json');

// 加载地址配置
function loadAddress() {
  try {
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      if (config.address && config.address.trim() !== '') {
        return config.address;
      }
    }
  } catch (error) {
    console.error('❌ 加载地址配置失败:', error);
  }
  return DEFAULT_ADDRESS;
}

// 保存地址配置
function saveAddress(address) {
  try {
    const config = { address: address.trim() };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
    console.log('✅ 地址已保存:', address);
    return true;
  } catch (error) {
    console.error('❌ 保存地址配置失败:', error);
    return false;
  }
}

// 显示地址输入对话框（修复版本）
function showAddressInputDialog(currentAddress) {
  // 创建一个简单的输入窗口
  const inputWindow = new BrowserWindow({
    width: 500,
    height: 300,
    resizable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  
  // 创建 HTML 内容
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>输入 OpenClaw 服务器地址</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px;
      background: #f5f5f7;
      margin: 0;
    }
    .container {
      max-width: 450px;
      margin: 0 auto;
    }
    h2 {
      color: #333;
      margin-top: 0;
      margin-bottom: 20px;
      font-size: 18px;
    }
    .description {
      color: #666;
      font-size: 14px;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .example {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 10px;
      margin-bottom: 20px;
      font-size: 13px;
      color: #555;
    }
    .example strong {
      color: #333;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }
    input {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 14px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }
    input:focus {
      outline: none;
      border-color: #007aff;
      box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
    }
    .button-group {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    button {
      padding: 8px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    button.primary {
      background: #007aff;
      color: white;
    }
    button.primary:hover {
      background: #0056cc;
    }
    button.secondary {
      background: #e5e5ea;
      color: #333;
    }
    button.secondary:hover {
      background: #d1d1d6;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>输入 OpenClaw 服务器地址</h2>
    
    <div class="description">
      请输入要连接的 OpenClaw 服务器地址：
    </div>
    
    <div class="example">
      <strong>格式示例：</strong><br>
      • 本地地址: <code>http://127.0.0.1:18789/</code><br>
      • 局域网地址: <code>http://192.168.1.100:18789/</code><br>
      • 域名地址: <code>http://example.com:18789/</code>
    </div>
    
    <label for="address">服务器地址：</label>
    <input type="text" id="address" value="${currentAddress}" placeholder="例如: http://192.168.1.100:18789/">
    
    <div class="button-group">
      <button class="secondary" onclick="cancel()">取消</button>
      <button class="primary" onclick="submit()">确定</button>
    </div>
  </div>
  
  <script>
    const { ipcRenderer } = require('electron');
    
    function submit() {
      const address = document.getElementById('address').value.trim();
      if (address) {
        ipcRenderer.send('address-input-result', { address: address });
      }
    }
    
    function cancel() {
      ipcRenderer.send('address-input-result', { address: null });
    }
    
    // 自动聚焦输入框
    document.getElementById('address').focus();
    document.getElementById('address').select();
    
    // 按 Enter 键提交
    document.getElementById('address').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submit();
      }
    });
    
    // 按 Escape 键取消
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        cancel();
      }
    });
  </script>
</body>
</html>`;
  
  return new Promise((resolve) => {
    // 设置 IPC 监听
    const { ipcMain } = require('electron');
    
    const handleResult = (event, result) => {
      ipcMain.removeListener('address-input-result', handleResult);
      inputWindow.close();
      resolve(result.address);
    };
    
    ipcMain.once('address-input-result', handleResult);
    
    // 加载 HTML 并显示窗口
    inputWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(htmlContent)}`);
    inputWindow.once('ready-to-show', () => {
      inputWindow.show();
    });
  });
}

// 显示地址选择对话框
function showAddressDialog() {
  const currentAddress = loadAddress();
  
  const result = dialog.showMessageBoxSync({
    type: 'question',
    buttons: ['使用当前地址', '修改地址', '使用默认地址', '取消'],
    defaultId: 0,
    cancelId: 3,
    title: 'OpenClaw 连接地址',
    message: '选择连接地址:',
    detail: `当前地址: ${currentAddress}
默认地址: ${DEFAULT_ADDRESS}

选择"修改地址"可以输入自定义地址。`
  });
  
  if (result === 0) {
    // 使用当前地址
    return { address: currentAddress, shouldSave: false };
  } else if (result === 1) {
    // 修改地址 - 使用新的输入对话框
    return showAddressInputDialog(currentAddress).then(newAddress => {
      if (newAddress && newAddress.trim() !== '') {
        return { address: newAddress.trim(), shouldSave: true };
      } else {
        return { address: currentAddress, shouldSave: false };
      }
    });
  } else if (result === 2) {
    // 使用默认地址
    return Promise.resolve({ address: DEFAULT_ADDRESS, shouldSave: true });
  } else {
    // 取消
    return Promise.resolve(null);
  }
}

// 启动代理服务器（可选）
function startProxyServer() {
  try {
    const proxyPath = path.join(__dirname, 'dataset-proxy.js');
    if (fs.existsSync(proxyPath)) {
      console.log('🚀 启动数据翻译代理服务器...');
      
      const proxyProcess = spawn('node', [proxyPath], {
        detached: true,
        stdio: 'ignore'
      });
      
      proxyProcess.unref();
      
      setTimeout(() => {
        console.log('✅ 代理服务器已启动');
      }, 500);
      
      app.on('before-quit', () => {
        try {
          proxyProcess.kill();
        } catch (e) {}
      });
    }
  } catch (error) {
    console.error('❌ 启动代理服务器失败:', error);
  }
}

function createWindow(targetAddress) {
  // 设置应用图标
  let appIcon = null;
  try {
    const iconPath = path.join(__dirname, 'icon.png');
    appIcon = nativeImage.createFromPath(iconPath);
  } catch (err) {
    console.warn('无法加载应用图标:', err.message);
  }
  
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      clipboard: true,
      clipboardRead: true,
      clipboardWrite: true
    },
    icon: appIcon,
    titleBarStyle: 'default',
    frame: true,
    show: true
  });

  // 启动代理服务器（如果需要）
  if (targetAddress.includes('127.0.0.1:18790')) {
    startProxyServer();
  }
  
  console.log(`🔗 正在连接到: ${targetAddress}`);
  
  // 尝试连接
  mainWindow.loadURL(targetAddress).catch(err => {
    console.error('❌ 连接失败:', err.message);
    
    // 显示错误对话框
    dialog.showErrorBox('连接失败', 
      `无法连接到 OpenClaw 服务器:
      
      地址: ${targetAddress}
      
      错误: ${err.message}
      
      请检查:
      1. OpenClaw 网关是否正在运行
      2. 地址是否正确
      3. 网络连接是否正常
      4. 防火墙设置
      
      点击确定后可以重新选择地址。`);
    
    // 重新显示地址对话框
    showAddressDialog().then(newAddress => {
      if (newAddress) {
        if (newAddress.shouldSave) {
          saveAddress(newAddress.address);
        }
        mainWindow.loadURL(newAddress.address);
      }
    });
  });
  
  // 设置窗口标题
  mainWindow.on('page-title-updated', (event) => {
    event.preventDefault();
    mainWindow.setTitle(`OpenClaw - ${targetAddress}`);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 创建菜单
  const template = [
    {
      label: 'OpenClaw',
      submenu: [
        { label: '关于 OpenClaw', role: 'about' },
        { 
          label: '修改连接地址', 
          click: () => {
            const currentAddress = loadAddress();
            showAddressInputDialog(currentAddress).then(newAddress => {
              if (newAddress && newAddress.trim() !== '') {
                if (saveAddress(newAddress)) {
                  dialog.showMessageBox({
                    type: 'info',
                    title: '地址已更新',
                    message: '连接地址已更新',
                    detail: `新地址: ${newAddress}\n\n需要重启应用生效。`
                  });
                }
              }
            });
          }
        },
        { type: 'separator' },
        { label: '隐藏', accelerator: 'Cmd+H', role: 'hide' },
        { label: '退出', accelerator: 'Cmd+Q', click: () => app.quit() }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { label: '剪切', accelerator: 'Cmd+X', role: 'cut' },
        { label: '复制', accelerator: 'Cmd+C', role: 'copy' },
        { label: '粘贴', accelerator: 'Cmd+V', role: 'paste' }
      ]
    },
    {
      label: '视图',
      submenu: [
        { label: '重新加载', accelerator: 'Cmd+R', role: 'reload' },
        { label: '开发者工具', accelerator: 'Cmd+Option+I', role: 'toggleDevTools' }
      ]
    }
  ];
  
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  console.log('✅ OpenClaw 窗口创建完成');
}

app.whenReady().then(() => {
  console.log('🚀 OpenClaw 桌面客户端启动中...');
  
  // 显示地址选择对话框
  showAddressDialog().then(addressChoice => {
    if (addressChoice) {
      // 保存地址（如果需要）
      if (addressChoice.shouldSave) {
        saveAddress(addressChoice.address);
      }
      
      // 创建窗口
      createWindow(addressChoice.address);
    } else {
      // 用户取消
      console.log('❌ 用户取消启动');
      app.quit();
    }
  });
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    const address = loadAddress();
    createWindow(address);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});