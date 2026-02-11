// HTML修改器 - 直接修改加载的HTML内容
const { session } = require('electron');

console.log('🌐 HTML Modifier loading...');

// 获取主窗口
const mainWindow = global.mainWindow;

// 拦截和修改Web请求
function setupRequestInterceptor() {
  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    const url = details.url;
    
    // 如果是OpenClaw主页面
    if (url === 'http://127.0.0.1:18789/' || url === 'http://127.0.0.1:18789') {
      console.log('🔧 Intercepting OpenClaw page request');
      
      // 我们将在响应阶段修改内容
      callback({ cancel: false });
    } else {
      callback({ cancel: false });
    }
  });
  
  // 修改响应内容
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const url = details.url;
    
    if (url === 'http://127.0.0.1:18789/' || url === 'http://127.0.0.1:18789') {
      console.log('🔧 Modifying OpenClaw page response');
      
      // 修改响应头，允许修改内容
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Type': ['text/html; charset=utf-8']
        }
      });
    } else {
      callback({ cancel: false });
    }
  });
  
  // 修改响应体
  session.defaultSession.webRequest.onCompleted(async (details) => {
    const url = details.url;
    
    if (url === 'http://127.0.0.1:18789/' || url === 'http://127.0.0.1:18789') {
      console.log('✅ OpenClaw page loaded, will inject translation');
      
      // 给页面一点时间加载，然后注入脚本
      setTimeout(() => {
        injectTranslationScript();
      }, 1000);
    }
  });
}

// 注入翻译脚本
function injectTranslationScript() {
  const script = `
    (function() {
      console.log('🚀 HTML Modifier translation script injected');
      
      // 立即修改标题
      document.title = 'OpenClaw 控制面板';
      
      // 修改html lang属性
      document.documentElement.lang = 'zh-CN';
      
      // 强大的文本替换函数
      function replaceTextInNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const translations = {
            // 导航
            'Dashboard': '仪表板',
            'Sessions': '会话',
            'Tools': '工具',
            'Skills': '技能',
            'Memory': '记忆',
            'Settings': '设置',
            'Help': '帮助',
            
            // 按钮
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
            
            // 状态
            'Loading...': '加载中...',
            'Saving...': '保存中...',
            'Error': '错误',
            'Success': '成功',
            'Warning': '警告',
            'Connected': '已连接',
            'Disconnected': '已断开'
          };
          
          let text = node.textContent;
          let changed = false;
          
          Object.keys(translations).forEach(english => {
            const regex = new RegExp(english.replace(/[.*+?^\${}()|[\]\\]/g, '\\\\$&'), 'g');
            if (regex.test(text)) {
              text = text.replace(regex, translations[english]);
              changed = true;
            }
          });
          
          if (changed) {
            node.textContent = text;
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // 处理属性
          ['placeholder', 'title', 'aria-label'].forEach(attr => {
            if (node.hasAttribute(attr)) {
              let value = node.getAttribute(attr);
              const translations = {
                'Search': '搜索',
                'Filter': '筛选',
                'Name': '名称',
                'Description': '描述'
              };
              
              Object.keys(translations).forEach(english => {
                const regex = new RegExp(english.replace(/[.*+?^\${}()|[\]\\]/g, '\\\\$&'), 'g');
                if (regex.test(value)) {
                  value = value.replace(regex, translations[english]);
                  node.setAttribute(attr, value);
                }
              });
            }
          });
          
          // 递归处理子节点
          node.childNodes.forEach(child => {
            replaceTextInNode(child);
          });
        }
      }
      
      // 主翻译函数
      function translatePage() {
        console.log('🔧 Starting page translation...');
        
        // 翻译整个文档
        replaceTextInNode(document.body);
        
        // 尝试处理shadow DOM
        try {
          const openclawApp = document.querySelector('openclaw-app');
          if (openclawApp && openclawApp.shadowRoot) {
            replaceTextInNode(openclawApp.shadowRoot);
          }
        } catch (error) {
          console.log('⚠️ Cannot access shadow DOM:', error.message);
        }
        
        console.log('✅ Page translation completed');
        
        // 创建翻译状态指示器
        createTranslationIndicator();
      }
      
      // 创建翻译状态指示器
      function createTranslationIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'translation-status-indicator';
        indicator.innerHTML = \`
          <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 16px;
            border-radius: 10px;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 99999;
            cursor: pointer;
            user-select: none;
          ">
            <div style="font-weight: bold; margin-bottom: 5px;">🌐 中文翻译已启用</div>
            <div style="font-size: 12px; opacity: 0.9;">点击重新翻译页面</div>
          </div>
        \`;
        
        indicator.addEventListener('click', () => {
          translatePage();
          showNotification('页面已重新翻译');
        });
        
        document.body.appendChild(indicator);
        
        // 显示通知
        showNotification('🌐 页面已翻译为中文');
      }
      
      // 显示通知
      function showNotification(message) {
        const notice = document.createElement('div');
        notice.innerHTML = \`
          <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 99999;
            animation: slideIn 0.3s ease;
          ">
            \${message}
          </div>
        \`;
        
        // 添加CSS动画
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
        
        // 3秒后自动消失
        setTimeout(() => {
          notice.style.animation = 'fadeOut 0.5s ease';
          setTimeout(() => notice.remove(), 500);
        }, 3000);
      }
      
      // 监听DOM变化
      function observeDOMChanges() {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
              setTimeout(() => {
                mutation.addedNodes.forEach(node => {
                  if (node.nodeType === Node.ELEMENT_NODE) {
                    replaceTextInNode(node);
                  }
                });
              }, 100);
            }
          });
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        
        console.log('👀 DOM observer started');
      }
      
      // 初始化
      function init() {
        console.log('🚀 Translation system initializing...');
        
        // 立即翻译
        translatePage();
        
        // 开始监听DOM变化
        observeDOMChanges();
        
        // 定期重新翻译（处理动态内容）
        setInterval(translatePage, 3000);
        
        console.log('✅ Translation system ready');
      }
      
      // 启动
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
      } else {
        init();
      }
      
      // 导出到控制台
      window.translateOpenClawPage = translatePage;
      window.showTranslationNotice = showNotification;
      
    })();
  `;
  
  // 执行脚本
  mainWindow.webContents.executeJavaScript(script).catch(err => {
    console.error('Failed to execute translation script:', err);
  });
}

// 初始化
setupRequestInterceptor();
console.log('✅ HTML Modifier initialized');