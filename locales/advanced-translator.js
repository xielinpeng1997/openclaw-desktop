// 高级翻译引擎
// 专门针对OpenClaw的复杂界面

console.log('🚀 Advanced Translator loading...');

class AdvancedTranslator {
  constructor() {
    this.translations = this.getCompleteDictionary();
    this.translatedCount = 0;
    this.initialized = false;
  }

  getCompleteDictionary() {
    return {
      // === 核心导航 ===
      'Dashboard': '仪表板',
      'Sessions': '会话',
      'Tools': '工具',
      'Skills': '技能',
      'Memory': '记忆',
      'Settings': '设置',
      'Help': '帮助',
      'About': '关于',
      
      // === 按钮和操作 ===
      'Save': '保存',
      'Cancel': '取消',
      'Edit': '编辑',
      'Delete': '删除',
      'Copy': '复制',
      'Paste': '粘贴',
      'Close': '关闭',
      'Open': '打开',
      'New': '新建',
      'Add': '添加',
      'Remove': '移除',
      'Update': '更新',
      'Refresh': '刷新',
      'Search': '搜索',
      'Filter': '筛选',
      'Sort': '排序',
      'Export': '导出',
      'Import': '导入',
      'Download': '下载',
      'Upload': '上传',
      'Submit': '提交',
      'Confirm': '确认',
      'OK': '确定',
      'Apply': '应用',
      'Reset': '重置',
      'Back': '返回',
      'Next': '下一步',
      'Previous': '上一步',
      'Finish': '完成',
      
      // === 特定操作 ===
      'New Session': '新建会话',
      'Send Message': '发送消息',
      'Clear Chat': '清空聊天',
      'Run Tool': '运行工具',
      'Execute': '执行',
      'Install': '安装',
      'Uninstall': '卸载',
      'Enable': '启用',
      'Disable': '禁用',
      'Configure': '配置',
      'Manage': '管理',
      'View': '查看',
      'Preview': '预览',
      'Share': '分享',
      'Publish': '发布',
      'Archive': '归档',
      'Restore': '恢复',
      
      // === 状态和提示 ===
      'Loading...': '加载中...',
      'Saving...': '保存中...',
      'Processing...': '处理中...',
      'Connecting...': '连接中...',
      'Waiting...': '等待中...',
      'Error': '错误',
      'Success': '成功',
      'Warning': '警告',
      'Info': '信息',
      'Note': '备注',
      'Tip': '提示',
      'Hint': '提示',
      'Alert': '警报',
      'Notification': '通知',
      'Message': '消息',
      
      // === 连接状态 ===
      'Connected': '已连接',
      'Disconnected': '已断开',
      'Connecting': '连接中',
      'Online': '在线',
      'Offline': '离线',
      'Active': '活跃',
      'Inactive': '非活跃',
      'Enabled': '已启用',
      'Disabled': '已禁用',
      'Running': '运行中',
      'Stopped': '已停止',
      'Paused': '已暂停',
      'Completed': '已完成',
      'Failed': '失败',
      'Pending': '待处理',
      'Queued': '排队中',
      
      // === 表单和输入 ===
      'Name': '名称',
      'Title': '标题',
      'Description': '描述',
      'Type': '类型',
      'Category': '分类',
      'Tags': '标签',
      'Status': '状态',
      'Priority': '优先级',
      'Created': '创建时间',
      'Updated': '更新时间',
      'Modified': '修改时间',
      'Author': '作者',
      'Owner': '所有者',
      'Version': '版本',
      'Size': '大小',
      'Count': '数量',
      'Total': '总计',
      'Average': '平均',
      'Maximum': '最大',
      'Minimum': '最小',
      
      // === 工具相关 ===
      'Terminal': '终端',
      'Console': '控制台',
      'Editor': '编辑器',
      'Browser': '浏览器',
      'Viewer': '查看器',
      'Explorer': '资源管理器',
      'Monitor': '监视器',
      'Debugger': '调试器',
      'Analyzer': '分析器',
      'Generator': '生成器',
      'Validator': '验证器',
      
      // === AI和模型 ===
      'Model': '模型',
      'Provider': '提供商',
      'Assistant': '助手',
      'Agent': '代理',
      'System': '系统',
      'User': '用户',
      'Prompt': '提示',
      'Response': '响应',
      'Context': '上下文',
      'Tokens': '令牌',
      'Temperature': '温度',
      'Max Tokens': '最大令牌数',
      'Top P': 'Top P',
      'Frequency Penalty': '频率惩罚',
      'Presence Penalty': '存在惩罚',
      
      // === 配置和设置 ===
      'Configuration': '配置',
      'Preferences': '偏好设置',
      'Options': '选项',
      'Settings': '设置',
      'General': '通用',
      'Advanced': '高级',
      'Basic': '基础',
      'Security': '安全',
      'Privacy': '隐私',
      'Network': '网络',
      'Storage': '存储',
      'Memory': '内存',
      'Performance': '性能',
      'Appearance': '外观',
      'Language': '语言',
      'Theme': '主题',
      'Font': '字体',
      'Color': '颜色',
      
      // === 文件操作 ===
      'File': '文件',
      'Folder': '文件夹',
      'Directory': '目录',
      'Path': '路径',
      'Filename': '文件名',
      'Extension': '扩展名',
      'Content': '内容',
      'Metadata': '元数据',
      'Properties': '属性',
      'Permissions': '权限',
      
      // === 日期和时间 ===
      'Today': '今天',
      'Yesterday': '昨天',
      'Tomorrow': '明天',
      'Week': '周',
      'Month': '月',
      'Year': '年',
      'Hour': '小时',
      'Minute': '分钟',
      'Second': '秒',
      'Date': '日期',
      'Time': '时间',
      'Duration': '持续时间',
      'Interval': '间隔',
      
      // === 常见短语 ===
      'Click to': '点击以',
      'Press to': '按下以',
      'Select to': '选择以',
      'Choose to': '选择以',
      'Enter to': '输入以',
      'Type to': '输入以',
      'Drag to': '拖拽以',
      'Drop to': '放置以',
      'Hover to': '悬停以',
      'Scroll to': '滚动以',
      'Zoom to': '缩放以',
      
      // === 技术术语 ===
      'API': 'API',
      'CLI': '命令行界面',
      'GUI': '图形界面',
      'URL': '网址',
      'URI': '统一资源标识符',
      'HTTP': 'HTTP',
      'HTTPS': 'HTTPS',
      'WebSocket': 'WebSocket',
      'JSON': 'JSON',
      'XML': 'XML',
      'YAML': 'YAML',
      'CSV': 'CSV',
      'PDF': 'PDF',
      'PNG': 'PNG',
      'JPEG': 'JPEG',
      'SVG': 'SVG',
      
      // === OpenClaw特定 ===
      'OpenClaw': 'OpenClaw',
      'Gateway': '网关',
      'Node': '节点',
      'Plugin': '插件',
      'Extension': '扩展',
      'Skill': '技能',
      'Tool': '工具',
      'Channel': '频道',
      'Session': '会话',
      'Message': '消息',
      'History': '历史',
      'Log': '日志',
      'Event': '事件',
      'Trigger': '触发器',
      'Action': '动作',
      'Condition': '条件',
      'Rule': '规则',
      'Workflow': '工作流',
      'Pipeline': '流水线',
      'Schedule': '计划',
      'Cron': '定时任务',
      'Webhook': 'Webhook',
      'API Key': 'API密钥',
      'Token': '令牌',
      'Secret': '密钥',
      'Credential': '凭证',
      'Authentication': '认证',
      'Authorization': '授权',
      'Encryption': '加密',
      'Decryption': '解密',
      'Hash': '哈希',
      'Signature': '签名',
      'Certificate': '证书',
      'License': '许可证'
    };
  }

  // 智能文本匹配
  translateText(text) {
    if (!text || typeof text !== 'string') return text;
    
    let translated = text;
    let changed = false;
    
    // 优先匹配完整单词
    Object.keys(this.translations).forEach(english => {
      // 使用单词边界匹配
      const regex = new RegExp(`\\b${this.escapeRegExp(english)}\\b`, 'gi');
      if (regex.test(translated)) {
        translated = translated.replace(regex, this.translations[english]);
        changed = true;
      }
    });
    
    // 如果没有匹配完整单词，尝试部分匹配（用于复合词）
    if (!changed) {
      Object.keys(this.translations).forEach(english => {
        if (translated.includes(english)) {
          translated = translated.replace(new RegExp(this.escapeRegExp(english), 'gi'), this.translations[english]);
          changed = true;
        }
      });
    }
    
    return changed ? translated : text;
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // 深度遍历和翻译
  traverseAndTranslate(node) {
    if (!node) return;
    
    // 翻译文本节点
    if (node.nodeType === Node.TEXT_NODE) {
      const originalText = node.textContent;
      const translatedText = this.translateText(originalText);
      
      if (translatedText !== originalText) {
        node.textContent = translatedText;
        this.translatedCount++;
      }
    }
    // 翻译元素节点
    else if (node.nodeType === Node.ELEMENT_NODE) {
      // 翻译属性
      const attributes = ['placeholder', 'title', 'aria-label', 'alt', 'value'];
      attributes.forEach(attr => {
        if (node.hasAttribute(attr)) {
          const original = node.getAttribute(attr);
          const translated = this.translateText(original);
          if (translated !== original) {
            node.setAttribute(attr, translated);
          }
        }
      });
      
      // 递归处理子节点
      if (node.childNodes && node.childNodes.length > 0) {
        node.childNodes.forEach(child => {
          this.traverseAndTranslate(child);
        });
      }
    }
  }

  // 翻译整个文档
  translateDocument() {
    console.log('🔍 Starting advanced translation...');
    this.translatedCount = 0;
    
    const startTime = Date.now();
    
    // 翻译主文档
    this.traverseAndTranslate(document.body);
    
    // 尝试翻译Shadow DOM
    this.translateShadowDOM();
    
    // 更新页面元数据
    this.updatePageMetadata();
    
    const elapsedTime = Date.now() - startTime;
    console.log(`✅ Advanced translation completed: ${this.translatedCount} items in ${elapsedTime}ms`);
    
    return this.translatedCount;
  }

  // 翻译Shadow DOM
  translateShadowDOM() {
    try {
      // 查找所有可能的自定义元素
      const selectors = [
        'openclaw-app',
        '*[shadowroot]',
        '*'
      ];
      
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          try {
            if (element.shadowRoot) {
              this.traverseAndTranslate(element.shadowRoot);
            }
          } catch (e) {
            // 忽略无法访问的shadow roots
          }
        });
      });
    } catch (error) {
      console.log('⚠️ Shadow DOM translation limited:', error.message);
    }
  }

  // 更新页面元数据
  updatePageMetadata() {
    // 确保标题是中文
    if (!document.title.includes('控制面板')) {
      document.title = document.title.replace('OpenClaw Control', 'OpenClaw 控制面板');
      if (!document.title.includes('控制面板')) {
        document.title = 'OpenClaw 控制面板';
      }
    }
    
    // 设置语言属性
    document.documentElement.lang = 'zh-CN';
    
    // 更新meta描述（如果有）
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const translated = this.translateText(metaDescription.getAttribute('content'));
      metaDescription.setAttribute('content', translated);
    }
  }

  // 初始化
  init() {
    if (this.initialized) return;
    
    console.log('🚀 Advanced translator initializing...');
    
    // 立即翻译
    setTimeout(() => {
      const count = this.translateDocument();
      this.showNotification(`初始翻译完成: ${count} 处文本`);
    }, 1000);
    
    // 监听DOM变化
    this.observeDOM();
    
    // 定期重新翻译
    setInterval(() => {
      const count = this.translateDocument();
      if (count > 0) {
        console.log(`🔄 Periodic translation: ${count} new items`);
      }
    }, 3000);
    
    this.initialized = true;
    console.log('✅ Advanced translator ready');
  }

  // 监听DOM变化
  observeDOM() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          setTimeout(() => {
            mutation.addedNodes.forEach(node => {
              this.traverseAndTranslate(node);
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

  // 显示简洁通知
  showNotification(message) {
    const notice = document.createElement('div');
    notice.innerHTML = `
      <div style="
        position: fixed;
        top: 10px;
        right: 10px;
        background: linear-gradient(135deg, #4CAF50, #2196F3);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 99999;
        animation: slideIn 0.3s ease;
      ">
        🌐 ${message}
      </div>
    `;
    
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
    
    setTimeout(() => {
      notice.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => notice.remove(), 500);
    }, 2000);
  }
}

// 创建全局实例
window.advancedTranslator = new AdvancedTranslator();

// 自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.advancedTranslator.init();
  });
} else {
  window.advancedTranslator.init();
}

// 导出函数
window.translateOpenClawAdvanced = () => window.advancedTranslator.translateDocument();

console.log('🚀 Advanced translator loaded. Use translateOpenClawAdvanced() in console.');