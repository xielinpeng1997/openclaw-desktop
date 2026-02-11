// OpenClaw 语言注入脚本
// 这个脚本将被注入到 OpenClaw 控制界面中，用于添加多语言支持

(function() {
  console.log('🌐 Starting OpenClaw language injection...');
  
  // 等待页面加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSupport);
  } else {
    initLanguageSupport();
  }
  
  async function initLanguageSupport() {
    console.log('🌐 Initializing language support...');
    
    // 创建语言管理器脚本
    const languageManagerScript = document.createElement('script');
    languageManagerScript.src = '/locales/language-manager.js';
    languageManagerScript.type = 'module';
    
    languageManagerScript.onload = async () => {
      console.log('✅ Language manager script loaded');
      
      try {
        // 初始化语言管理器
        await window.languageManager.init();
        
        // 创建语言切换器
        window.languageManager.createLanguageSwitcher();
        
        // 监听DOM变化，动态应用翻译
        observeDOMChanges();
        
        console.log('🎉 Language support initialized successfully');
      } catch (error) {
        console.error('❌ Failed to initialize language support:', error);
      }
    };
    
    languageManagerScript.onerror = (error) => {
      console.error('❌ Failed to load language manager script:', error);
    };
    
    // 将脚本添加到页面
    document.head.appendChild(languageManagerScript);
    
    // 预加载语言文件
    preloadLanguageFiles();
  }
  
  function preloadLanguageFiles() {
    const languages = ['en', 'zh-CN'];
    
    languages.forEach(lang => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'fetch';
      link.href = `/locales/${lang}.json`;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
  
  function observeDOMChanges() {
    // 使用 MutationObserver 监听DOM变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // 对新添加的节点应用翻译
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              applyTranslationsToElement(node);
            }
          });
        }
      });
    });
    
    // 开始观察整个文档
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    console.log('👀 DOM observer started for dynamic translations');
  }
  
  function applyTranslationsToElement(element) {
    // 如果元素有 data-i18n 属性，应用翻译
    if (element.hasAttribute('data-i18n')) {
      const key = element.getAttribute('data-i18n');
      const translation = window.languageManager.t(key);
      
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    }
    
    // 递归处理子元素
    element.querySelectorAll('[data-i18n]').forEach(child => {
      const key = child.getAttribute('data-i18n');
      const translation = window.languageManager.t(key);
      
      if (translation) {
        if (child.tagName === 'INPUT' || child.tagName === 'TEXTAREA') {
          child.placeholder = translation;
        } else {
          child.textContent = translation;
        }
      }
    });
  }
  
  // 添加CSS样式
  const style = document.createElement('style');
  style.textContent = `
    /* 语言切换器样式 */
    .language-switcher {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    }
    
    .language-switcher:hover {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    .language-switcher button {
      transition: all 0.2s ease;
    }
    
    .language-switcher button:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    }
    
    /* 高亮显示可翻译元素（开发模式） */
    [data-i18n] {
      /* border: 1px dashed #007bff !important; */
    }
    
    [data-i18n]:hover::after {
      /* content: attr(data-i18n);
      position: absolute;
      background: #007bff;
      color: white;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
      z-index: 10000; */
    }
  `;
  document.head.appendChild(style);
  
  console.log('📝 Language injection script loaded');
})();