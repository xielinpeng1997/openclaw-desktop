// 简单语言注入脚本
// 直接注入硬编码的翻译，不依赖外部文件

(function() {
  console.log('🌐 Injecting simple language support...');
  
  // 硬编码的翻译
  const translations = {
    'en': {
      'app': { 'title': 'OpenClaw Control' },
      'navigation': {
        'dashboard': 'Dashboard',
        'sessions': 'Sessions',
        'tools': 'Tools',
        'skills': 'Skills',
        'memory': 'Memory',
        'settings': 'Settings',
        'help': 'Help'
      },
      'buttons': {
        'save': 'Save',
        'cancel': 'Cancel',
        'edit': 'Edit',
        'delete': 'Delete',
        'copy': 'Copy',
        'newSession': 'New Session',
        'sendMessage': 'Send Message',
        'uploadFile': 'Upload File',
        'clearChat': 'Clear Chat'
      },
      'status': {
        'saving': 'Saving...',
        'loading': 'Loading...',
        'error': 'Error'
      }
    },
    'zh-CN': {
      'app': { 'title': 'OpenClaw 控制面板' },
      'navigation': {
        'dashboard': '仪表板',
        'sessions': '会话',
        'tools': '工具',
        'skills': '技能',
        'memory': '记忆',
        'settings': '设置',
        'help': '帮助'
      },
      'buttons': {
        'save': '保存',
        'cancel': '取消',
        'edit': '编辑',
        'delete': '删除',
        'copy': '复制',
        'newSession': '新建会话',
        'sendMessage': '发送消息',
        'uploadFile': '上传文件',
        'clearChat': '清空聊天'
      },
      'status': {
        'saving': '保存中...',
        'loading': '加载中...',
        'error': '错误'
      }
    }
  };
  
  // 简单语言管理器
  const languageManager = {
    currentLang: 'zh-CN',
    
    t(key, defaultValue = '') {
      const keys = key.split('.');
      let value = translations[this.currentLang];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn('Translation key not found:', key);
          return defaultValue || this.getEnglishTranslation(key) || key;
        }
      }
      
      return value;
    },
    
    getEnglishTranslation(key) {
      const keys = key.split('.');
      let value = translations['en'];
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return null;
        }
      }
      
      return value;
    },
    
    applyTranslations() {
      // 更新页面标题
      document.title = this.t('app.title');
      
      // 常见文本替换
      this.replaceCommonText();
      
      // 尝试翻译已知元素
      this.translateKnownElements();
    },
    
    replaceCommonText() {
      const replacements = this.currentLang === 'zh-CN' ? [
        // 导航
        { search: /\bDashboard\b/g, replace: '仪表板' },
        { search: /\bSessions\b/g, replace: '会话' },
        { search: /\bTools\b/g, replace: '工具' },
        { search: /\bSkills\b/g, replace: '技能' },
        { search: /\bMemory\b/g, replace: '记忆' },
        { search: /\bSettings\b/g, replace: '设置' },
        { search: /\bHelp\b/g, replace: '帮助' },
        
        // 按钮
        { search: /\bSave\b/g, replace: '保存' },
        { search: /\bCancel\b/g, replace: '取消' },
        { search: /\bEdit\b/g, replace: '编辑' },
        { search: /\bDelete\b/g, replace: '删除' },
        { search: /\bCopy\b/g, replace: '复制' },
        { search: /\bNew Session\b/g, replace: '新建会话' },
        { search: /\bSend Message\b/g, replace: '发送消息' },
        { search: /\bUpload File\b/g, replace: '上传文件' },
        { search: /\bClear Chat\b/g, replace: '清空聊天' },
        
        // 状态
        { search: /\bSaving\.\.\./g, replace: '保存中...' },
        { search: /\bLoading\.\.\./g, replace: '加载中...' },
        { search: /\bError\b/g, replace: '错误' },
        { search: /\bSuccess\b/g, replace: '成功' },
        { search: /\bWarning\b/g, replace: '警告' }
      ] : [];
      
      if (replacements.length > 0) {
        this.replaceTextInDocument(replacements);
      }
    },
    
    replaceTextInDocument(replacements) {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function(node) {
            // 跳过脚本和样式标签
            if (node.parentElement.tagName === 'SCRIPT' || 
                node.parentElement.tagName === 'STYLE') {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        },
        false
      );
      
      let node;
      const nodesToUpdate = [];
      
      // 收集需要更新的节点
      while (node = walker.nextNode()) {
        if (node.textContent.trim()) {
          nodesToUpdate.push(node);
        }
      }
      
      // 更新节点内容
      nodesToUpdate.forEach(node => {
        let newText = node.textContent;
        replacements.forEach(replacement => {
          newText = newText.replace(replacement.search, replacement.replace);
        });
        
        if (newText !== node.textContent) {
          node.textContent = newText;
        }
      });
    },
    
    translateKnownElements() {
      // 尝试通过选择器找到常见元素
      const selectors = {
        // 按钮
        'button:contains("Save")': '保存',
        'button:contains("Cancel")': '取消',
        'button:contains("Edit")': '编辑',
        'button:contains("Delete")': '删除',
        'button:contains("Copy")': '复制',
        
        // 标题
        'h1:contains("Dashboard")': '仪表板',
        'h2:contains("Sessions")': '会话',
        'h3:contains("Tools")': '工具'
      };
      
      if (this.currentLang === 'zh-CN') {
        Object.keys(selectors).forEach(selector => {
          try {
            // 注意：:contains 不是标准CSS选择器，这里只是示例
            // 实际实现可能需要更复杂的选择器
          } catch (error) {
            // 忽略选择器错误
          }
        });
      }
    },
    
    createLanguageSwitcher() {
      const container = document.createElement('div');
      container.id = 'openclaw-language-switcher';
      container.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        display: flex;
        align-items: center;
        gap: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      `;
      
      const label = document.createElement('span');
      label.textContent = '语言:';
      container.appendChild(label);
      
      ['en', 'zh-CN'].forEach(lang => {
        const button = document.createElement('button');
        button.textContent = lang === 'en' ? 'English' : '中文';
        button.style.cssText = `
          padding: 4px 8px;
          border: 1px solid #666;
          background: ${lang === this.currentLang ? '#007bff' : '#333'};
          color: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 11px;
        `;
        
        button.addEventListener('click', () => {
          this.currentLang = lang;
          this.applyTranslations();
          
          // 更新按钮样式
          container.querySelectorAll('button').forEach(btn => {
            btn.style.background = '#333';
          });
          button.style.background = '#007bff';
          
          // 更新标签
          label.textContent = lang === 'en' ? 'Language:' : '语言:';
        });
        
        container.appendChild(button);
      });
      
      document.body.appendChild(container);
    },
    
    init() {
      // 检测浏览器语言
      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang.startsWith('zh')) {
        this.currentLang = 'zh-CN';
      }
      
      // 应用翻译
      this.applyTranslations();
      
      // 创建语言切换器
      this.createLanguageSwitcher();
      
      // 监听DOM变化
      this.observeDOM();
      
      console.log('🌐 Simple language manager initialized with:', this.currentLang);
    },
    
    observeDOM() {
      // 使用MutationObserver监听新添加的元素
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            // 给一点延迟，确保内容加载完成
            setTimeout(() => {
              this.applyTranslations();
            }, 100);
          }
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  };
  
  // 全局可用
  window.simpleLanguageManager = languageManager;
  
  // 初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      languageManager.init();
    });
  } else {
    languageManager.init();
  }
  
  console.log('✅ Simple language support injected');
})();