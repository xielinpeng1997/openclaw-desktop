// Preload script - Enhanced clipboard support ONLY
const { contextBridge, ipcRenderer, clipboard } = require('electron');

// Enhanced clipboard functions
const enhancedClipboard = {
  // Write text to clipboard
  writeText: (text) => {
    try {
      clipboard.writeText(text);
      console.log('📋 Clipboard write successful:', text.substring(0, 50) + (text.length > 50 ? '...' : ''));
      return true;
    } catch (error) {
      console.error('📋 Clipboard write failed:', error);
      return false;
    }
  },
  
  // Read text from clipboard
  readText: () => {
    try {
      const text = clipboard.readText();
      console.log('📋 Clipboard read successful:', text.substring(0, 50) + (text.length > 50 ? '...' : ''));
      return text;
    } catch (error) {
      console.error('📋 Clipboard read failed:', error);
      return '';
    }
  },
  
  // Check if clipboard has text
  hasText: () => {
    try {
      const text = clipboard.readText();
      return text && text.trim().length > 0;
    } catch (error) {
      return false;
    }
  },
  
  // Enhanced copy with fallback
  copyWithFallback: (text) => {
    // Try Electron API first
    if (enhancedClipboard.writeText(text)) {
      return true;
    }
    
    // Fallback to execCommand
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    } catch (err) {
      console.error('📋 All copy methods failed:', err);
      return false;
    }
  },
  
  // Enhanced paste with fallback
  pasteWithFallback: () => {
    // Try Electron API first
    const electronText = enhancedClipboard.readText();
    if (electronText !== '') {
      return electronText;
    }
    
    // Fallback to execCommand
    try {
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.focus();
      const success = document.execCommand('paste');
      const text = textarea.value;
      document.body.removeChild(textarea);
      return success ? text : '';
    } catch (err) {
      console.error('📋 All paste methods failed:', err);
      return '';
    }
  }
};

// Expose enhanced APIs to renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // OpenClaw URLs
  getOpenClawUrl: () => ipcRenderer.invoke('get-openclaw-url'),
  checkOpenClawStatus: () => ipcRenderer.invoke('check-openclaw-status'),
  
  // Window controls
  closeWindow: () => ipcRenderer.send('window-control', 'close'),
  minimizeWindow: () => ipcRenderer.send('window-control', 'minimize'),
  maximizeWindow: () => ipcRenderer.send('window-control', 'maximize'),
  
  // Notifications
  showNotification: (title, body) => ipcRenderer.send('show-notification', title, body),
  
  // External links
  openExternal: (url) => ipcRenderer.send('open-external', url),
  
  // Enhanced clipboard API
  copyToClipboard: enhancedClipboard.writeText,
  pasteFromClipboard: enhancedClipboard.readText,
  hasClipboardText: enhancedClipboard.hasText,
  copyWithFallback: enhancedClipboard.copyWithFallback,
  pasteWithFallback: enhancedClipboard.pasteWithFallback
});

// Listen for messages from main process
ipcRenderer.on('openclaw-status', (event, status) => {
  console.log('OpenClaw status update:', status);
});

// Inject enhanced clipboard polyfill when page loads
window.addEventListener('DOMContentLoaded', () => {
  console.log('OpenClaw desktop client loaded');
  
  const clipboardPolyfill = `
    // Enhanced clipboard polyfill for Electron
    (function() {
      console.log('Injecting enhanced clipboard polyfill...');
      
      // Store original clipboard if it exists
      const originalClipboard = window.navigator.clipboard;
      
      // Create enhanced clipboard object
      const enhancedClipboard = {
        // Write text with multiple fallbacks
        writeText: function(text) {
          return new Promise((resolve, reject) => {
            // 1. Try Electron API
            if (window.electronAPI && window.electronAPI.copyToClipboard) {
              const success = window.electronAPI.copyToClipboard(text);
              if (success) {
                console.log('📋 Copy via Electron API: SUCCESS');
                resolve();
                return;
              }
            }
            
            // 2. Try original navigator.clipboard
            if (originalClipboard && originalClipboard.writeText) {
              originalClipboard.writeText(text)
                .then(() => {
                  console.log('📋 Copy via navigator.clipboard: SUCCESS');
                  resolve();
                })
                .catch(err => {
                  console.log('📋 Copy via navigator.clipboard failed, trying fallback...');
                  // Continue to fallback
                });
            }
            
            // 3. Try execCommand fallback
            try {
              const textarea = document.createElement('textarea');
              textarea.value = text;
              document.body.appendChild(textarea);
              textarea.select();
              const success = document.execCommand('copy');
              document.body.removeChild(textarea);
              
              if (success) {
                console.log('📋 Copy via execCommand: SUCCESS');
                resolve();
              } else {
                reject(new Error('All copy methods failed'));
              }
            } catch (err) {
              reject(new Error('Copy error: ' + err.message));
            }
          });
        },
        
        // Read text with multiple fallbacks
        readText: function() {
          return new Promise((resolve, reject) => {
            // 1. Try Electron API
            if (window.electronAPI && window.electronAPI.pasteFromClipboard) {
              const text = window.electronAPI.pasteFromClipboard();
              if (text !== '') {
                console.log('📋 Paste via Electron API: SUCCESS');
                resolve(text);
                return;
              }
            }
            
            // 2. Try original navigator.clipboard
            if (originalClipboard && originalClipboard.readText) {
              originalClipboard.readText()
                .then(text => {
                  console.log('📋 Paste via navigator.clipboard: SUCCESS');
                  resolve(text);
                })
                .catch(err => {
                  console.log('📋 Paste via navigator.clipboard failed, trying fallback...');
                  // Continue to fallback
                });
            }
            
            // 3. Try execCommand fallback
            try {
              const textarea = document.createElement('textarea');
              document.body.appendChild(textarea);
              textarea.focus();
              const success = document.execCommand('paste');
              const text = textarea.value;
              document.body.removeChild(textarea);
              
              if (success) {
                console.log('📋 Paste via execCommand: SUCCESS');
                resolve(text);
              } else {
                reject(new Error('All paste methods failed'));
              }
            } catch (err) {
              reject(new Error('Paste error: ' + err.message));
            }
          });
        }
      };
      
      // Replace or augment navigator.clipboard
      if (!window.navigator.clipboard) {
        window.navigator.clipboard = enhancedClipboard;
        console.log('✅ navigator.clipboard polyfilled');
      } else {
        // Augment existing clipboard
        const originalWrite = window.navigator.clipboard.writeText;
        const originalRead = window.navigator.clipboard.readText;
        
        window.navigator.clipboard.writeText = function(text) {
          return enhancedClipboard.writeText(text).catch(() => {
            // Fallback to original if enhanced fails
            if (originalWrite) return originalWrite.call(this, text);
            throw new Error('Clipboard write failed');
          });
        };
        
        window.navigator.clipboard.readText = function() {
          return enhancedClipboard.readText().catch(() => {
            // Fallback to original if enhanced fails
            if (originalRead) return originalRead.call(this);
            throw new Error('Clipboard read failed');
          });
        };
        
        console.log('✅ navigator.clipboard enhanced with fallbacks');
      }
      
      // Add global clipboard helper
      window.clipboardHelper = {
        copy: function(text) {
          return enhancedClipboard.writeText(text);
        },
        paste: function() {
          return enhancedClipboard.readText();
        },
        copyText: function(text) {
          if (window.electronAPI && window.electronAPI.copyWithFallback) {
            return window.electronAPI.copyWithFallback(text);
          }
          return enhancedClipboard.writeText(text).then(() => true).catch(() => false);
        },
        pasteText: function() {
          if (window.electronAPI && window.electronAPI.pasteWithFallback) {
            return Promise.resolve(window.electronAPI.pasteWithFallback());
          }
          return enhancedClipboard.readText();
        }
      };
      
      console.log('🎉 Enhanced clipboard support ready');
    })();
  `;
  
  // Inject the polyfill script
  const script = document.createElement('script');
  script.textContent = clipboardPolyfill;
  document.head.appendChild(script);
});