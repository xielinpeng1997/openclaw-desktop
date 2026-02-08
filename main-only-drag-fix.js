const { app, BrowserWindow, Menu, nativeImage } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // 设置应用图标
  let appIcon = null;
  try {
    const iconPath = path.join(__dirname, 'icon.png');
    appIcon = nativeImage.createFromPath(iconPath);
    console.log('App icon loaded from:', iconPath);
  } catch (err) {
    console.warn('Could not load app icon:', err.message);
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
    // 设置窗口图标
    icon: appIcon,
    // 完全标准窗口，没有任何自定义
    titleBarStyle: 'default',
    frame: true,
    show: true
  });

  // 直接加载 OpenClaw
  mainWindow.loadURL('http://127.0.0.1:18789/');

  mainWindow.on('closed', () => {
    console.log('Window closed');
    mainWindow = null;
  });

  // 标准菜单
  const template = [
    {
      label: 'OpenClaw',
      submenu: [
        { label: 'About OpenClaw', role: 'about' },
        { type: 'separator' },
        { label: 'Hide', accelerator: 'Cmd+H', role: 'hide' },
        { label: 'Quit', accelerator: 'Cmd+Q', click: () => app.quit() }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Cut', accelerator: 'Cmd+X', role: 'cut' },
        { label: 'Copy', accelerator: 'Cmd+C', role: 'copy' },
        { label: 'Paste', accelerator: 'Cmd+V', role: 'paste' }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  console.log('Plain OpenClaw window created');
}

app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

console.log('🚀 OpenClaw Desktop (Plain Version) starting...');