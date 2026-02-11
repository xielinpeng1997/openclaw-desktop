// 调试和检查脚本
(function() {
  console.log('🔍 OpenClaw Debug Inspector starting...');
  
  // 创建调试面板
  function createDebugPanel() {
    const panel = document.createElement('div');
    panel.id = 'openclaw-debug-panel';
    panel.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 99999;
      background: rgba(0, 0, 0, 0.95);
      color: #00ff00;
      padding: 15px;
      border-radius: 8px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 12px;
      max-width: 500px;
      max-height: 80vh;
      overflow: auto;
      box-shadow: 0 0 20px rgba(0, 255, 0, 0.3);
      border: 1px solid #00ff00;
    `;
    
    const title = document.createElement('div');
    title.textContent = '🔍 OpenClaw Debug Panel';
    title.style.cssText = `
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 14px;
      color: #00ff00;
      border-bottom: 1px solid #00ff00;
      padding-bottom: 5px;
    `;
    panel.appendChild(title);
    
    return panel;
  }
  
  // 添加按钮到面板
  function addButton(panel, text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.cssText = `
      background: #333;
      color: #00ff00;
      border: 1px solid #00ff00;
      padding: 5px 10px;
      margin: 5px;
      border-radius: 4px;
      cursor: pointer;
      font-family: inherit;
      font-size: 11px;
    `;
    button.addEventListener('click', onClick);
    panel.appendChild(button);
    return button;
  }
  
  // 添加信息到面板
  function addInfo(panel, label, value) {
    const info = document.createElement('div');
    info.style.cssText = `
      margin: 5px 0;
      padding: 3px;
      background: rgba(0, 255, 0, 0.1);
      border-radius: 3px;
    `;
    
    const labelSpan = document.createElement('span');
    labelSpan.textContent = label + ': ';
    labelSpan.style.fontWeight = 'bold';
    
    const valueSpan = document.createElement('span');
    valueSpan.textContent = value;
    
    info.appendChild(labelSpan);
    info.appendChild(valueSpan);
    panel.appendChild(info);
  }
  
  // 检查页面结构
  function inspectPageStructure() {
    console.log('🔍 Inspecting page structure...');
    
    const info = {
      title: document.title,
      openclawApp: document.querySelector('openclaw-app'),
      hasShadowRoot: false,
      shadowRoot: null,
      textNodes: 0,
      englishTexts: []
    };
    
    // 检查 openclaw-app 元素
    if (info.openclawApp) {
      console.log('✅ Found openclaw-app element');
      info.hasShadowRoot = !!info.openclawApp.shadowRoot;
      info.shadowRoot = info.openclawApp.shadowRoot;
    }
    
    // 收集所有文本内容
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    const englishWords = ['Dashboard', 'Sessions', 'Tools', 'Skills', 'Save', 'Cancel', 'Edit'];
    
    while (node = walker.nextNode()) {
      info.textNodes++;
      const text = node.textContent.trim();
      
      if (text) {
        englishWords.forEach(word => {
          if (text.includes(word)) {
            info.englishTexts.push({
              text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
              parent: node.parentElement ? node.parentElement.tagName : 'none'
            });
          }
        });
      }
    }
    
    return info;
  }
  
  // 尝试翻译
  function attemptTranslation() {
    console.log('🔄 Attempting translation...');
    
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
      'Send Message': '发送消息'
    };
    
    let translatedCount = 0;
    
    // 方法1: 直接文本替换
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
    
    // 方法2: 尝试访问shadow DOM
    try {
      const openclawApp = document.querySelector('openclaw-app');
      if (openclawApp && openclawApp.shadowRoot) {
        console.log('🎯 Found shadow root, translating...');
        
        const shadowWalker = document.createTreeWalker(
          openclawApp.shadowRoot,
          NodeFilter.SHOW_TEXT,
          null,
          false
        );
        
        let shadowNode;
        while (shadowNode = shadowWalker.nextNode()) {
          let text = shadowNode.textContent;
          let changed = false;
          
          Object.keys(translations).forEach(english => {
            if (text.includes(english)) {
              text = text.replace(new RegExp(english, 'g'), translations[english]);
              changed = true;
              translatedCount++;
            }
          });
          
          if (changed) {
            shadowNode.textContent = text;
          }
        }
      }
    } catch (error) {
      console.log('⚠️ Cannot access shadow DOM:', error.message);
    }
    
    return translatedCount;
  }
  
  // 显示元素边界（调试用）
  function showElementBounds() {
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const text = el.textContent || el.placeholder || el.title || '';
        if (text.trim() && text.length < 50) {
          console.log(`📦 ${el.tagName}: "${text.substring(0, 30)}"`, rect);
        }
      }
    });
  }
  
  // 主函数
  function main() {
    console.log('🚀 Debug inspector starting...');
    
    // 创建调试面板
    const panel = createDebugPanel();
    
    // 检查页面结构
    const pageInfo = inspectPageStructure();
    
    addInfo(panel, '页面标题', pageInfo.title);
    addInfo(panel, 'openclaw-app 元素', pageInfo.openclawApp ? '找到' : '未找到');
    addInfo(panel, 'Shadow Root', pageInfo.hasShadowRoot ? '有' : '无');
    addInfo(panel, '文本节点数', pageInfo.textNodes);
    addInfo(panel, '找到的英文文本', pageInfo.englishTexts.length);
    
    // 显示找到的英文文本
    if (pageInfo.englishTexts.length > 0) {
      const englishList = document.createElement('div');
      englishList.style.cssText = `
        margin-top: 10px;
        max-height: 100px;
        overflow-y: auto;
        border: 1px solid #444;
        padding: 5px;
      `;
      
      const subtitle = document.createElement('div');
      subtitle.textContent = '找到的英文文本:';
      subtitle.style.fontWeight = 'bold';
      englishList.appendChild(subtitle);
      
      pageInfo.englishTexts.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.style.cssText = 'font-size: 10px; margin: 2px 0;';
        itemDiv.textContent = `${index + 1}. ${item.text} (${item.parent})`;
        englishList.appendChild(itemDiv);
      });
      
      panel.appendChild(englishList);
    }
    
    // 添加按钮
    addButton(panel, '尝试翻译', () => {
      const count = attemptTranslation();
      alert(`翻译了 ${count} 处文本`);
      location.reload();
    });
    
    addButton(panel, '显示元素边界', showElementBounds);
    
    addButton(panel, '检查Shadow DOM', () => {
      const openclawApp = document.querySelector('openclaw-app');
      if (openclawApp && openclawApp.shadowRoot) {
        console.log('Shadow Root内容:', openclawApp.shadowRoot.innerHTML.substring(0, 500) + '...');
        alert('Shadow DOM找到，查看控制台');
      } else {
        alert('未找到Shadow DOM');
      }
    });
    
    addButton(panel, '隐藏面板', () => {
      panel.style.display = 'none';
    });
    
    addButton(panel, '关闭面板', () => {
      panel.remove();
    });
    
    // 添加到页面
    document.body.appendChild(panel);
    
    console.log('✅ Debug panel created');
    
    // 自动尝试翻译
    setTimeout(() => {
      const count = attemptTranslation();
      console.log(`✅ 自动翻译完成，翻译了 ${count} 处文本`);
      
      if (count > 0) {
        const notice = document.createElement('div');
        notice.textContent = `✅ 翻译了 ${count} 处文本`;
        notice.style.cssText = `
          position: fixed;
          bottom: 60px;
          right: 10px;
          background: #28a745;
          color: white;
          padding: 10px 15px;
          border-radius: 6px;
          z-index: 99999;
          font-family: sans-serif;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(notice);
        
        setTimeout(() => notice.remove(), 3000);
      }
    }, 1000);
  }
  
  // 启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
  
  // 导出到全局
  window.debugOpenClaw = {
    inspect: inspectPageStructure,
    translate: attemptTranslation,
    showBounds: showElementBounds
  };
  
  console.log('🔍 Debug inspector ready. Use debugOpenClaw in console.');
})();