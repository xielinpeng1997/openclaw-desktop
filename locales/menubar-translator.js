// macOS状态栏翻译器
const { Tray, Menu, nativeImage } = require('electron');
const path = require('path');

console.log('🍎 macOS Menubar Translator loading...');

class MenubarTranslator {
  constructor() {
    this.tray = null;
    this.isTranslating = false;
    this.translationCount = 0;
    this.init();
  }

  init() {
    try {
      // 创建状态栏图标
      this.createTrayIcon();
      console.log('✅ Menubar translator initialized');
    } catch (error) {
      console.error('❌ Failed to create menubar translator:', error);
    }
  }

  createTrayIcon() {
    // 创建图标
    const iconPath = path.join(__dirname, '..', 'icon.png');
    let trayIcon;
    
    try {
      trayIcon = nativeImage.createFromPath(iconPath);
      // 调整图标大小
      trayIcon = trayIcon.resize({ width: 16, height: 16 });
    } catch (error) {
      // 使用默认图标
      trayIcon = nativeImage.createFromBuffer(Buffer.from(`
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <rect width="16" height="16" rx="3" fill="#007AFF"/>
          <text x="8" y="11" text-anchor="middle" font-family="Arial" font-size="10" fill="white">中</text>
        </svg>
      `));
    }

    // 创建状态栏图标
    this.tray = new Tray(trayIcon);
    this.tray.setToolTip('OpenClaw 中文翻译器\n点击管理翻译设置');

    // 创建菜单
    this.updateMenu();
  }

  updateMenu() {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'OpenClaw 中文翻译器',
        enabled: false,
        icon: nativeImage.createFromBuffer(Buffer.from(`
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" fill="#007AFF"/>
            <text x="8" y="11" text-anchor="middle" font-family="Arial" font-size="8" fill="white">中</text>
          </svg>
        `))
      },
      { type: 'separator' },
      {
        label: this.isTranslating ? '🔄 翻译中...' : '🌐 立即翻译界面',
        click: () => this.translateInterface(),
        accelerator: 'Cmd+T'
      },
      {
        label: `已翻译: ${this.translationCount} 处`,
        enabled: false
      },
      { type: 'separator' },
      {
        label: '📋 翻译设置',
        submenu: [
          {
            label: '自动翻译新内容',
            type: 'checkbox',
            checked: true,
            click: (item) => this.toggleAutoTranslate(item.checked)
          },
          {
            label: '显示翻译通知',
            type: 'checkbox',
            checked: false,
            click: (item) => this.toggleNotifications(item.checked)
          },
          { type: 'separator' },
          {
            label: '翻译深度: 标准',
            enabled: false
          }
        ]
      },
      { type: 'separator' },
      {
        label: '📊 翻译统计',
        submenu: [
          {
            label: '查看翻译日志',
            click: () => this.showTranslationLog()
          },
          {
            label: '导出翻译数据',
            click: () => this.exportTranslations()
          }
        ]
      },
      { type: 'separator' },
      {
        label: '❓ 帮助',
        submenu: [
          {
            label: '翻译问题反馈',
            click: () => this.showFeedback()
          },
          {
            label: '查看翻译词典',
            click: () => this.showDictionary()
          }
        ]
      },
      { type: 'separator' },
      {
        label: '🚪 退出翻译器',
        role: 'quit'
      }
    ]);

    this.tray.setContextMenu(contextMenu);
  }

  async translateInterface() {
    if (this.isTranslating) return;
    
    this.isTranslating = true;
    this.updateMenu();
    
    try {
      console.log('🔄 Starting translation via menubar...');
      
      // 获取当前窗口
      const mainWindow = global.mainWindow;
      if (!mainWindow) {
        throw new Error('Main window not found');
      }
      
      // 执行翻译脚本 - 使用高级翻译引擎
      const result = await mainWindow.webContents.executeJavaScript(`
        (function() {
          console.log('🔄 Menubar translation triggered');
          
          // 使用高级翻译引擎
          function enhancedTranslate() {
            if (window.advancedTranslator) {
              return window.advancedTranslator.translateDocument();
            }
            
            // 回退到基本翻译
            const translations = {
              // 导航和主要区域
              'Dashboard': '仪表板',
              'Sessions': '会话',
              'Tools': '工具',
              'Skills': '技能',
              'Memory': '记忆',
              'Settings': '设置',
              'Help': '帮助',
              
              // 按钮和操作
              'Save': '保存',
              'Cancel': '取消',
              'Edit': '编辑',
              'Delete': '删除',
              'Copy': '复制',
              'Paste': '粘贴',
              'New Session': '新建会话',
              'Send Message': '发送消息',
              'Upload File': '上传文件',
              'Clear Chat': '清空聊天',
              'Close': '关闭',
              'Submit': '提交',
              'Confirm': '确认',
              'OK': '确定',
              'Apply': '应用',
              'Reset': '重置',
              
              // 状态和提示
              'Loading...': '加载中...',
              'Saving...': '保存中...',
              'Processing...': '处理中...',
              'Error': '错误',
              'Success': '成功',
              'Warning': '警告',
              'Info': '信息',
              'Note': '备注',
              'Tip': '提示',
              'Connected': '已连接',
              'Disconnected': '已断开',
              'Online': '在线',
              'Offline': '离线',
              
              // 表单和输入
              'Name': '名称',
              'Description': '描述',
              'Title': '标题',
              'Type': '类型',
              'Status': '状态',
              'Created': '创建时间',
              'Updated': '更新时间',
              'Actions': '操作',
              'Search': '搜索',
              'Filter': '筛选',
              'Sort': '排序',
              'Refresh': '刷新',
              'Export': '导出',
              'Import': '导入',
              
              // 工具相关
              'Terminal': '终端',
              'File Browser': '文件浏览器',
              'Code Editor': '代码编辑器',
              'Web Search': '网页搜索',
              'Image Viewer': '图片查看器',
              'Documentation': '文档',
              
              // 模型和AI
              'Model': '模型',
              'Provider': '提供商',
              'Tokens': '令牌',
              'Context': '上下文',
              'Temperature': '温度',
              'Max Tokens': '最大令牌数',
              'Assistant': '助手',
              'System': '系统',
              'User': '用户',
              
              // 会话管理
              'Active': '活跃',
              'Inactive': '非活跃',
              'Paused': '已暂停',
              'Running': '运行中',
              'Stopped': '已停止',
              'Completed': '已完成',
              'Failed': '失败',
              
              // 更多常见文本
              'Configuration': '配置',
              'Preferences': '偏好设置',
              'Advanced': '高级',
              'Basic': '基础',
              'General': '通用',
              'Security': '安全',
              'Privacy': '隐私',
              'Network': '网络',
              'Storage': '存储',
              'Memory': '内存',
              'CPU': '处理器',
              'Disk': '磁盘',
              'Performance': '性能',
              'Logs': '日志',
              'Debug': '调试',
              'Test': '测试',
              'Development': '开发',
              'Production': '生产',
              'Staging': '预发布'
            };
            
            let translatedCount = 0;
            
            // 深度遍历函数
            function traverseAndTranslate(node) {
              if (node.nodeType === Node.TEXT_NODE) {
                let text = node.textContent;
                let changed = false;
                
                Object.keys(translations).forEach(english => {
                  // 使用更智能的匹配
                  const regex = new RegExp(\`\\\\b\${english}\\\\b\`, 'gi');
                  if (regex.test(text)) {
                    text = text.replace(regex, translations[english]);
                    changed = true;
                    translatedCount++;
                  }
                });
                
                if (changed) {
                  node.textContent = text;
                }
              } else if (node.nodeType === Node.ELEMENT_NODE) {
                // 翻译属性
                ['placeholder', 'title', 'aria-label', 'alt'].forEach(attr => {
                  if (node.hasAttribute(attr)) {
                    let value = node.getAttribute(attr);
                    Object.keys(translations).forEach(english => {
                      const regex = new RegExp(\`\\\\b\${english}\\\\b\`, 'gi');
                      if (regex.test(value)) {
                        value = value.replace(regex, translations[english]);
                        node.setAttribute(attr, value);
                      }
                    });
                  }
                });
                
                // 递归遍历子节点
                node.childNodes.forEach(child => {
                  traverseAndTranslate(child);
                });
              }
            }
            
            // 翻译整个文档
            traverseAndTranslate(document.body);
            
            // 尝试访问Shadow DOM
            try {
              const openclawApp = document.querySelector('openclaw-app');
              if (openclawApp && openclawApp.shadowRoot) {
                traverseAndTranslate(openclawApp.shadowRoot);
              }
              
              // 尝试访问所有shadow roots
              document.querySelectorAll('*').forEach(element => {
                try {
                  if (element.shadowRoot) {
                    traverseAndTranslate(element.shadowRoot);
                  }
                } catch (e) {
                  // 忽略无法访问的shadow roots
                }
              });
            } catch (error) {
              console.log('⚠️ Shadow DOM access limited:', error.message);
            }
            
            // 更新页面标题（确保是中文）
            document.title = document.title.replace('OpenClaw Control', 'OpenClaw 控制面板');
            if (!document.title.includes('控制面板')) {
              document.title = 'OpenClaw 控制面板';
            }
            
            // 更新语言属性
            document.documentElement.lang = 'zh-CN';
            
            return translatedCount;
          }
          
          // 执行翻译
          const count = enhancedTranslate();
          console.log(\`✅ Enhanced translation completed: \${count} items\`);
          
          // 显示简洁通知
          if (count > 0) {
            const notice = document.createElement('div');
            notice.innerHTML = \`
              <div style="
                position: fixed;
                top: 10px;
                right: 10px;
                background: linear-gradient(135deg, #4CAF50, #2196F3);
                color: white;
                padding: 10px 15px;
                border-radius: 6px;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 12px;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                z-index: 99999;
                animation: slideIn 0.3s ease;
              ">
                🌐 已翻译 \${count} 处文本
              </div>
            \`;
            
            const style = document.createElement('style');
            style.textContent = \`
              @keyframes slideIn {
                from {
                  transform: translateX(100%);
                  opacity: 0;
                }
                to {
                  transform: translateX(0);
                  opacity: 1;
                }
              }
              @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
              }
            \`;
            document.head.appendChild(style);
            
            document.body.appendChild(notice);
            
            setTimeout(() => {
              notice.style.animation = 'fadeOut 0.5s ease';
              setTimeout(() => notice.remove(), 500);
            }, 2000);
          }
          
          return count;
        })()
      `);
      
      this.translationCount = result || 0;
      console.log(`✅ Translation completed: ${this.translationCount} items translated`);
      
      // 显示系统通知
      this.showSystemNotification(`已翻译 ${this.translationCount} 处文本`);
      
    } catch (error) {
      console.error('❌ Translation failed:', error);
      this.showSystemNotification('翻译失败，请检查控制台');
    } finally {
      this.isTranslating = false;
      this.updateMenu();
    }
  }

  toggleAutoTranslate(enabled) {
    console.log(`Auto translate: ${enabled ? 'enabled' : 'disabled'}`);
    // 这里可以添加自动翻译逻辑
  }

  toggleNotifications(enabled) {
    console.log(`Notifications: ${enabled ? 'enabled' : 'disabled'}`);
  }

  showTranslationLog() {
    console.log('Showing translation log...');
    // 这里可以显示翻译日志
  }

  exportTranslations() {
    console.log('Exporting translations...');
    // 这里可以导出翻译数据
  }

  showFeedback() {
    console.log('Showing feedback form...');
    // 这里可以显示反馈表单
  }

  showDictionary() {
    console.log('Showing translation dictionary...');
    // 这里可以显示翻译词典
  }

  showSystemNotification(message) {
    if (this.tray) {
      this.tray.displayBalloon({
        title: 'OpenClaw 翻译器',
        content: message,
        iconType: 'info'
      });
    }
  }
}

// 创建实例
const menubarTranslator = new MenubarTranslator();

// 导出供其他模块使用
module.exports = menubarTranslator;