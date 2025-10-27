import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ControlsBar from './components/ControlsBar';
import PromptTable from './components/PromptTable';
import ReplaceDialog from './components/ReplaceDialog';
import { PromptItem, AppState } from './types';
import { defaultPrompts, getRandomPrompts, getRandomReplacement } from './data';
import { texts } from './i18n';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    all: defaultPrompts,
    shown: [],
    copyMode: 'prompt',
    language: 'en'
  });
  
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [replaceDialog, setReplaceDialog] = useState<{
    isOpen: boolean;
    targetId: number | null;
  }>({
    isOpen: false,
    targetId: null
  });
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({
    message: '',
    type: 'success',
    visible: false
  });
  
  const t = texts[state.language];
  
  // Initialize with random prompts
  useEffect(() => {
    setState(prev => ({
      ...prev,
      shown: getRandomPrompts(prev.all, 3)
    }));
    
    // Load saved preferences
    const savedLanguage = localStorage.getItem('prompter-language') as 'en' | 'zh' | null;
    const savedCopyMode = localStorage.getItem('prompter-copyMode') as 'prompt' | 'title+prompt' | null;
    
    if (savedLanguage) {
      setState(prev => ({ ...prev, language: savedLanguage }));
    }
    if (savedCopyMode) {
      setState(prev => ({ ...prev, copyMode: savedCopyMode }));
    }
  }, []);
  
  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('prompter-language', state.language);
    localStorage.setItem('prompter-copyMode', state.copyMode);
  }, [state.language, state.copyMode]);
  
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };
  
  const handleRandomize = async () => {
    setIsRandomizing(true);
    // Add slight delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setState(prev => ({
      ...prev,
      shown: getRandomPrompts(prev.all, 3)
    }));
    setIsRandomizing(false);
  };
  
  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      showToast(t.toast.copied);
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(t.toast.copied);
    }
  };

  const handleCopyAll = async () => {
    if (state.shown.length === 0) return;
    
    let content = '';
    if (state.copyMode === 'prompt') {
      content = state.shown.map((prompt, index) => {
        const promptText = state.language === 'zh' && prompt.promptZh ? prompt.promptZh : prompt.prompt;
        return `${index + 1}. ${promptText}`;
      }).join('\n\n');
    } else {
      content = state.shown.map((prompt, index) => {
        const title = state.language === 'zh' && prompt.titleZh ? prompt.titleZh : prompt.title;
        const promptText = state.language === 'zh' && prompt.promptZh ? prompt.promptZh : prompt.prompt;
        return `${index + 1}. ${title}\n${promptText}`;
      }).join('\n\n');
    }
    
    try {
      await navigator.clipboard.writeText(content);
      showToast(t.toast.copiedAll);
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(t.toast.copiedAll);
    }
  };
  
  const handleSave = (id: number, title: string, prompt: string) => {
    setState(prev => {
      const newAll = prev.all.map(p => 
        p.id === id ? { ...p, title, prompt } : p
      );
      const newShown = prev.shown.map(p => 
        p.id === id ? { ...p, title, prompt } : p
      );
      
      return {
        ...prev,
        all: newAll,
        shown: newShown
      };
    });
    showToast(t.toast.saved);
  };
  
  const handleRandomReplace = (id: number) => {
    const replacement = getRandomReplacement(state.all, state.shown, id);
    if (replacement) {
      setState(prev => ({
        ...prev,
        shown: prev.shown.map(p => p.id === id ? replacement : p)
      }));
    }
  };
  
  const handleSelectReplace = (id: number) => {
    setReplaceDialog({
      isOpen: true,
      targetId: id
    });
  };
  
  const handleReplaceDialogSelect = (newPrompt: PromptItem) => {
    if (replaceDialog.targetId) {
      setState(prev => ({
        ...prev,
        shown: prev.shown.map(p => 
          p.id === replaceDialog.targetId ? newPrompt : p
        )
      }));
    }
    setReplaceDialog({ isOpen: false, targetId: null });
  };
  
  const handleLanguageChange = (language: 'en' | 'zh') => {
    setState(prev => ({ ...prev, language }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={state.language}
        onLanguageChange={handleLanguageChange}
        onSettingsClick={() => {/* TODO: Implement settings modal */}}
      />
      
      <ControlsBar
        language={state.language}
        onRandomize={handleRandomize}
        isRandomizing={isRandomizing}
        onCopyAll={handleCopyAll}
        hasPrompts={state.shown.length > 0}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.shown.length > 0 ? (
          <PromptTable
            prompts={state.shown}
            language={state.language}
            copyMode={state.copyMode}
            onCopy={handleCopy}
            onSave={handleSave}
            onRandomReplace={handleRandomReplace}
            onSelectReplace={handleSelectReplace}
          />
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🎨</div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              {state.language === 'en' ? 'Welcome to Remix Prompter' : '欢迎使用 Remix 提示器'}
            </h2>
            <p className="text-gray-600">
              {state.language === 'en' 
                ? 'Click the button above to generate your first set of prompts!'
                : '点击上方按钮生成第一组提示词！'
              }
            </p>
          </div>
        )}
      </main>
      
      <ReplaceDialog
        isOpen={replaceDialog.isOpen}
        onClose={() => setReplaceDialog({ isOpen: false, targetId: null })}
        prompts={state.all}
        language={state.language}
        onSelect={handleReplaceDialogSelect}
        currentPromptIds={state.shown.map(p => p.id)}
      />
      
      {/* Toast Notification */}
      {toast.visible && (
        <div className={`
          fixed bottom-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium
          animate-slide-up transition-all duration-300
          ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
        `}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default App;