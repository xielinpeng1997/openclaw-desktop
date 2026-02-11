// OpenClaw 语言管理器
// 用于加载和管理多语言支持

class LanguageManager {
  constructor() {
    this.currentLang = 'zh-CN';
    this.translations = {};
    this.availableLanguages = ['en', 'zh-CN'];
  }

  // 加载语言文件
  async loadLanguage(lang = 'zh-CN') {
    try {
      const response = await fetch(`/locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load language file: ${lang}`);
      }
      
      this.translations[lang] = await response.json();
      this.currentLang = lang;
      
      console.log(`✅ Language loaded: ${lang}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to load language ${lang}:`, error);
      
      // 尝试加载默认语言
      if (lang !== 'en') {
        return this.loadLanguage('en');
      }
      return false;
    }
  }

  // 获取翻译
  t(key, defaultValue = '') {
    const keys = key.split('.');
    let value = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return defaultValue || key;
      }
    }
    
    return value;
  }

  // 切换语言
  async switchLanguage(lang) {
    if (!this.availableLanguages.includes(lang)) {
      console.error(`Language not available: ${lang}`);
      return false;
    }
    
    const success = await this.loadLanguage(lang);
    if (success) {
      this.applyTranslations();
      this.saveLanguagePreference(lang);
      return true;
    }
    return false;
  }

  // 应用翻译到页面
  applyTranslations() {
    // 更新页面标题
    document.title = this.t('app.title');
    
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (translation) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
    
    // 更新所有带有 data-i18n-title 属性的元素
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const key = element.getAttribute('data-i18n-title');
      const translation = this.t(key);
      
      if (translation) {
        element.title = translation;
      }
    });
    
    // 更新所有带有 data-i18n-aria-label 属性的元素
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria-label');
      const translation = this.t(key);
      
      if (translation) {
        element.setAttribute('aria-label', translation);
      }
    });
  }

  // 保存语言偏好到本地存储
  saveLanguagePreference(lang) {
    try {
      localStorage.setItem('openclaw-language', lang);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }

  // 从本地存储加载语言偏好
  loadLanguagePreference() {
    try {
      const savedLang = localStorage.getItem('openclaw-language');
      if (savedLang && this.availableLanguages.includes(savedLang)) {
        return savedLang;
      }
    } catch (error) {
      console.error('Failed to load language preference:', error);
    }
    
    // 默认根据浏览器语言设置
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('zh')) {
      return 'zh-CN';
    }
    return 'en';
  }

  // 初始化
  async init() {
    const preferredLang = this.loadLanguagePreference();
    await this.loadLanguage(preferredLang);
    this.applyTranslations();
    
    // 监听语言切换事件
    document.addEventListener('languageChange', (event) => {
      this.switchLanguage(event.detail.lang);
    });
    
    console.log('🌐 Language manager initialized');
  }

  // 创建语言切换UI
  createLanguageSwitcher() {
    const container = document.createElement('div');
    container.className = 'language-switcher';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 8px;
      font-size: 12px;
    `;
    
    const label = document.createElement('span');
    label.textContent = 'Language: ';
    container.appendChild(label);
    
    this.availableLanguages.forEach(lang => {
      const button = document.createElement('button');
      button.textContent = lang === 'en' ? 'English' : '中文';
      button.style.cssText = `
        margin-left: 5px;
        padding: 2px 8px;
        border: 1px solid #666;
        background: ${lang === this.currentLang ? '#007bff' : '#333'};
        color: white;
        border-radius: 4px;
        cursor: pointer;
      `;
      
      button.addEventListener('click', () => {
        this.switchLanguage(lang);
        // 更新按钮样式
        container.querySelectorAll('button').forEach(btn => {
          btn.style.background = '#333';
        });
        button.style.background = '#007bff';
      });
      
      container.appendChild(button);
    });
    
    document.body.appendChild(container);
    return container;
  }
}

// 创建全局实例
window.languageManager = new LanguageManager();

// 导出供其他模块使用
export default window.languageManager;