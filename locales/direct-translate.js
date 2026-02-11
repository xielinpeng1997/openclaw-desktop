// 直接翻译脚本 - 更强大的DOM操作
(function() {
  console.log('🚀 Starting direct translation...');
  
  // 等待页面完全加载
  function waitForOpenClawApp() {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        const openclawApp = document.querySelector('openclaw-app');
        if (openclawApp && openclawApp.shadowRoot) {
          clearInterval(checkInterval);
          resolve(openclawApp);
        }
      }, 100);
      
      // 10秒超时
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve(null);
      }, 10000);
    });
  }
  
  // 中文翻译映射
  const translations = {
    // 导航和主要区域
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
    'Close': '关闭',
    'Submit': '提交',
    'Confirm': '确认',
    'OK': '确定',
    
    // 状态和提示
    'Loading...': '加载中...',
    'Saving...': '保存中...',
    'Error': '错误',
    'Success': '成功',
    'Warning': '警告',
    'Info': '信息',
    'Connected': '已连接',
    'Disconnected': '已断开',
    'Online': '在线',
    'Offline': '离线',
    
    // 表单标签
    'Name': '名称',
    'Description': '描述',
    'Type': '类型',
    'Status': '状态',
    'Created': '创建时间',
    'Updated': '更新时间',
    'Actions': '操作',
    'Search': '搜索',
    'Filter': '筛选',
    'Sort': '排序',
    
    // 工具相关
    'Terminal': '终端',
    'File Browser': '文件浏览器',
    'Code Editor': '代码编辑器',
    'Web Search': '网页搜索',
    'Image Viewer': '图片查看器',
    
    // 会话相关
    'Active': '活跃',
    'Inactive': '非活跃',
    'Paused': '已暂停',
    'Running': '运行中',
    'Stopped': '已停止',
    
    // 模型相关
    'Model': '模型',
    'Provider': '提供商',
    'Tokens': '令牌',
    'Context': '上下文',
    'Temperature': '温度',
    'Max Tokens': '最大令牌数'
  };
  
  // 递归翻译函数
  function translateNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      let changed = false;
      
      Object.keys(translations).forEach(english => {
        if (text.includes(english)) {
          text = text.replace(new RegExp(english, 'g'), translations[english]);
          changed = true;
        }
      });
      
      if (changed) {
        node.textContent = text;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // 翻译属性
      ['placeholder', 'title', 'aria-label'].forEach(attr => {
        if (node.hasAttribute(attr)) {
          let value = node.getAttribute(attr);
          Object.keys(translations).forEach(english => {
            if (value.includes(english)) {
              value = value.replace(new RegExp(english, 'g'), translations[english]);
              node.setAttribute(attr, value);
            }
          });
        }
      });
      
      // 递归处理子节点
      node.childNodes.forEach(child => {
        translateNode(child);
      });
    }
  }
  
  // 主翻译函数
  async function translatePage() {
    console.log('🔍 Looking for OpenClaw app...');
    
    const openclawApp = await waitForOpenClawApp();
    if (!openclawApp) {
      console.log('⚠️ OpenClaw app not found, trying direct translation');
      translateNode(document.body);
      return;
    }
    
    console.log('✅ Found OpenClaw app, starting translation...');
    
    // 尝试访问shadow DOM
    try {
      const shadowRoot = openclawApp.shadowRoot;
      if (shadowRoot) {
        console.log('🎯 Found shadow root, translating...');
        translateNode(shadowRoot);
      }
    } catch (error) {
      console.log('⚠️ Cannot access shadow root:', error.message);
    }
    
    // 也翻译主文档
    translateNode(document.body);
    
    console.log('✅ Translation completed');
    
    // 创建语言切换器
    createLanguageSwitcher();
  }
  
  // 创建语言切换器
  function createLanguageSwitcher() {
    // 移除已存在的切换器
    const existing = document.getElementById('direct-translate-switcher');
    if (existing) existing.remove();
    
    const switcher = document.createElement('div');
    switcher.id = 'direct-translate-switcher';
    switcher.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 99999;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 16px;
      border-radius: 10px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      cursor: move;
      user-select: none;
    `;
    
    // 添加拖动功能
    let isDragging = false;
    let offsetX, offsetY;
    
    switcher.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - switcher.getBoundingClientRect().left;
      offsetY = e.clientY - switcher.getBoundingClientRect().top;
      switcher.style.opacity = '0.8';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      
      // 限制在窗口内
      const maxX = window.innerWidth - switcher.offsetWidth;
      const maxY = window.innerHeight - switcher.offsetHeight;
      
      switcher.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
      switcher.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
      switcher.style.right = 'auto';
      switcher.style.bottom = 'auto';
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
      switcher.style.opacity = '1';
    });
    
    const label = document.createElement('span');
    label.textContent = '🌐 语言:';
    label.style.fontWeight = 'bold';
    switcher.appendChild(label);
    
    // 中文按钮
    const chineseBtn = document.createElement('button');
    chineseBtn.textContent = '中文';
    chineseBtn.style.cssText = `
      padding: 6px 12px;
      border: 2px solid white;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
    `;
    chineseBtn.addEventListener('mouseenter', () => {
      chineseBtn.style.background = 'rgba(255, 255, 255, 0.3)';
      chineseBtn.style.transform = 'translateY(-2px)';
    });
    chineseBtn.addEventListener('mouseleave', () => {
      chineseBtn.style.background = 'rgba(255, 255, 255, 0.2)';
      chineseBtn.style.transform = 'translateY(0)';
    });
    chineseBtn.addEventListener('click', () => {
      translatePage();
      showNotification('已切换到中文界面');
    });
    
    // 英文按钮
    const englishBtn = document.createElement('button');
    englishBtn.textContent = 'English';
    englishBtn.style.cssText = chineseBtn.style.cssText;
    englishBtn.addEventListener('mouseenter', () => {
      englishBtn.style.background = 'rgba(255, 255, 255, 0.3)';
      englishBtn.style.transform = 'translateY(-2px)';
    });
    englishBtn.addEventListener('mouseleave', () => {
      englishBtn.style.background = 'rgba(255, 255, 255, 0.2)';
      englishBtn.style.transform = 'translateY(0)';
    });
    englishBtn.addEventListener('click', () => {
      // 重新加载页面回到英文
      location.reload();
      showNotification('Switched to English interface');
    });
    
    switcher.appendChild(chineseBtn);
    switcher.appendChild(englishBtn);
    
    // 关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.title = '关闭语言切换器';
    closeBtn.style.cssText = `
      margin-left: 8px;
      padding: 2px 8px;
      border: none;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
    `;
    closeBtn.addEventListener('click', () => {
      switcher.style.display = 'none';
      showNotification('语言切换器已隐藏，刷新页面可重新显示');
    });
    switcher.appendChild(closeBtn);
    
    document.body.appendChild(switcher);
    
    // 显示通知
    showNotification('🌐 翻译引擎已加载，点击"中文"按钮翻译界面');
  }
  
  // 显示通知
  function showNotification(message) {
    // 移除旧通知
    const oldNotice = document.getElementById('translation-notice');
    if (oldNotice) oldNotice.remove();
    
    const notice = document.createElement('div');
    notice.id = 'translation-notice';
    notice.textContent = message;
    notice.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      animation: slideIn 0.3s ease;
    `;
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notice);
    
    // 3秒后自动消失
    setTimeout(() => {
      notice.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => notice.remove(), 500);
    }, 3000);
  }
  
  // 监听DOM变化，持续翻译新内容
  function observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              setTimeout(() => {
                translateNode(node);
              }, 100);
            }
          });
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
    console.log('🚀 Direct translation script loaded');
    
    // 立即开始翻译
    translatePage();
    
    // 开始监听DOM变化
    observeDOMChanges();
    
    // 每5秒检查一次新内容
    setInterval(() => {
      translateNode(document.body);
    }, 5000);
  }
  
  // 等待页面加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // 导出函数供控制台使用
  window.translateOpenClaw = translatePage;
  window.showTranslationNotice = showNotification;
  
  console.log('✅ Direct translation script ready. Use translateOpenClaw() in console.');
})();