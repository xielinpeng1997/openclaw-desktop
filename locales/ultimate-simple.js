// 终极简单翻译脚本
// 只做最明显、最有效的更改

(function() {
  console.log('🚀 Ultimate simple translation starting...');
  
  // 1. 立即修改页面标题 - 这是最明显的
  document.title = 'OpenClaw 控制面板';
  
  // 2. 修改html语言属性
  document.documentElement.lang = 'zh-CN';
  
  // 3. 创建一个非常明显的翻译状态指示器
  function createSuperVisibleIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'ultimate-translation-indicator';
    indicator.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 15px;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 16px;
        font-weight: bold;
        z-index: 99999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        border-bottom: 3px solid white;
      ">
        🌐 OpenClaw 中文界面已启用 | 
        <span style="font-size: 14px; font-weight: normal;">
          页面标题已翻译为中文 | 右下角有翻译控制面板
        </span>
      </div>
    `;
    document.body.appendChild(indicator);
    
    // 10秒后自动隐藏顶部条
    setTimeout(() => {
      indicator.style.opacity = '0.7';
      indicator.style.transform = 'translateY(-10px)';
      indicator.style.transition = 'all 0.5s ease';
      
      setTimeout(() => {
        indicator.style.display = 'none';
      }, 500);
    }, 10000);
  }
  
  // 4. 创建右下角控制面板
  function createControlPanel() {
    const panel = document.createElement('div');
    panel.id = 'translation-control-panel';
    panel.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.95);
        color: white;
        padding: 20px;
        border-radius: 15px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        z-index: 99999;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        border: 2px solid #4ecdc4;
        min-width: 300px;
      ">
        <div style="
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          border-bottom: 1px solid #444;
          padding-bottom: 10px;
        ">
          <div style="font-size: 24px; margin-right: 10px;">🌐</div>
          <div>
            <div style="font-weight: bold; font-size: 18px;">中文翻译控制台</div>
            <div style="font-size: 12px; opacity: 0.8;">OpenClaw 界面翻译系统</div>
          </div>
        </div>
        
        <div style="margin-bottom: 15px;">
          <div style="
            background: rgba(78, 205, 196, 0.2);
            padding: 10px;
            border-radius: 8px;
            margin-bottom: 10px;
          ">
            <div style="font-weight: bold; color: #4ecdc4;">✓ 已完成</div>
            <div style="font-size: 12px; margin-top: 5px;">
              • 页面标题翻译<br>
              • 语言属性设置<br>
              • 翻译状态显示
            </div>
          </div>
          
          <div style="
            background: rgba(255, 107, 107, 0.2);
            padding: 10px;
            border-radius: 8px;
          ">
            <div style="font-weight: bold; color: #ff6b6b;">⏳ 待完成</div>
            <div style="font-size: 12px; margin-top: 5px;">
              • 界面文本翻译<br>
              • 按钮标签翻译<br>
              • 菜单项翻译
            </div>
          </div>
        </div>
        
        <div style="display: flex; gap: 10px; margin-bottom: 15px;">
          <button id="translate-now-btn" style="
            flex: 1;
            background: #4ecdc4;
            color: black;
            border: none;
            padding: 10px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
          ">
            立即翻译界面
          </button>
          
          <button id="hide-panel-btn" style="
            background: #666;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s;
          ">
            ✕
          </button>
        </div>
        
        <div style="font-size: 11px; opacity: 0.6; text-align: center;">
          由 Timi AI助手 开发的翻译系统
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
    
    // 按钮事件
    document.getElementById('translate-now-btn').addEventListener('click', () => {
      attemptFullTranslation();
      showNotification('正在尝试翻译界面...');
    });
    
    document.getElementById('hide-panel-btn').addEventListener('click', () => {
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(20px)';
      panel.style.transition = 'all 0.3s ease';
      
      setTimeout(() => {
        panel.style.display = 'none';
        showNotification('控制面板已隐藏，刷新页面可重新显示');
      }, 300);
    });
    
    // 添加拖动功能
    let isDragging = false;
    let offsetX, offsetY;
    
    panel.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'BUTTON') return;
      
      isDragging = true;
      offsetX = e.clientX - panel.getBoundingClientRect().left;
      offsetY = e.clientY - panel.getBoundingClientRect().top;
      panel.style.cursor = 'grabbing';
      panel.style.opacity = '0.9';
    });
    
    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      
      // 限制在窗口内
      const maxX = window.innerWidth - panel.offsetWidth;
      const maxY = window.innerHeight - panel.offsetHeight;
      
      panel.style.left = Math.max(10, Math.min(x, maxX)) + 'px';
      panel.style.top = Math.max(10, Math.min(y, maxY)) + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
      panel.style.cursor = '';
      panel.style.opacity = '1';
    });
  }
  
  // 5. 尝试完整翻译
  function attemptFullTranslation() {
    console.log('🔄 Attempting full translation...');
    
    // 简单的文本替换
    const translations = {
      'Dashboard': '仪表板',
      'Sessions': '会话',
      'Tools': '工具',
      'Skills': '技能',
      'Memory': '记忆',
      'Settings': '设置',
      'Help': '帮助',
      'Save': '保存',
      'Cancel': '取消',
      'Edit': '编辑',
      'Delete': '删除',
      'Copy': '复制',
      'New Session': '新建会话',
      'Send Message': '发送消息',
      'Upload File': '上传文件',
      'Clear Chat': '清空聊天',
      'Loading...': '加载中...',
      'Saving...': '保存中...',
      'Error': '错误',
      'Success': '成功',
      'Warning': '警告'
    };
    
    let translatedCount = 0;
    
    // 遍历所有文本节点
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      let text = node.textContent;
      let changed = false;
      
      Object.keys(translations).forEach(english => {
        if (text.includes(english)) {
          text = text.replace(new RegExp(english, 'g'), translations[english]);
          changed = true;
          translatedCount++;
        }
      });
      
      if (changed) {
        node.textContent = text;
      }
    }
    
    // 更新控制面板状态
    updatePanelStatus(translatedCount);
    
    return translatedCount;
  }
  
  // 6. 更新控制面板状态
  function updatePanelStatus(count) {
    const panel = document.getElementById('translation-control-panel');
    if (!panel) return;
    
    const statusDiv = panel.querySelector('div:nth-child(2) > div:first-child');
    if (statusDiv) {
      statusDiv.innerHTML = `
        <div style="font-weight: bold; color: #4ecdc4;">✓ 翻译完成</div>
        <div style="font-size: 12px; margin-top: 5px;">
          • 已翻译 ${count} 处文本<br>
          • 页面标题已设置<br>
          • 语言属性已更新
        </div>
      `;
    }
    
    showNotification(`✅ 成功翻译了 ${count} 处文本`);
  }
  
  // 7. 显示通知
  function showNotification(message) {
    // 移除旧通知
    const oldNotice = document.getElementById('translation-notice');
    if (oldNotice) oldNotice.remove();
    
    const notice = document.createElement('div');
    notice.id = 'translation-notice';
    notice.innerHTML = `
      <div style="
        position: fixed;
        top: 50px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 99998;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
      ">
        <div style="font-weight: bold; margin-bottom: 5px;">🌐 翻译系统</div>
        <div>${message}</div>
      </div>
    `;
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
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
    
    // 5秒后自动消失
    setTimeout(() => {
      notice.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => notice.remove(), 500);
    }, 5000);
  }
  
  // 8. 初始化
  function init() {
    console.log('🚀 Ultimate translation system initializing...');
    
    // 创建超级明显的指示器
    createSuperVisibleIndicator();
    
    // 创建控制面板
    createControlPanel();
    
    // 显示欢迎通知
    showNotification('欢迎使用 OpenClaw 中文翻译系统！');
    
    // 尝试自动翻译
    setTimeout(() => {
      const count = attemptFullTranslation();
      console.log(`✅ Initial translation completed: ${count} items`);
    }, 2000);
    
    // 定期检查新内容
    setInterval(() => {
      attemptFullTranslation();
    }, 10000);
    
    console.log('✅ Ultimate translation system ready');
  }
  
  // 9. 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // 10. 导出到控制台
  window.ultimateTranslate = attemptFullTranslation;
  window.showTranslationNotice = showNotification;
  
  console.log('🎯 Ultimate translation script loaded. Use ultimateTranslate() in console.');
})();