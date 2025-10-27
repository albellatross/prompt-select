import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { PromptItem } from '../types';
import { texts } from '../i18n';
import { searchPrompts } from '../data';

interface ReplaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  prompts: PromptItem[];
  language: 'en' | 'zh';
  onSelect: (prompt: PromptItem) => void;
  currentPromptIds: number[];
}

const ReplaceDialog: React.FC<ReplaceDialogProps> = ({
  isOpen,
  onClose,
  prompts,
  language,
  onSelect,
  currentPromptIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const t = texts[language];
  
  if (!isOpen) return null;
  
  const filteredPrompts = searchPrompts(prompts, searchQuery, language).filter(
    p => !currentPromptIds.includes(p.id)
  );
  
  const getDisplayTitle = (prompt: PromptItem) => {
    return language === 'zh' && prompt.titleZh ? prompt.titleZh : prompt.title;
  };
  
  const getDisplayPrompt = (prompt: PromptItem) => {
    return language === 'zh' && prompt.promptZh ? prompt.promptZh : prompt.prompt;
  };
  
  const handleSelect = (prompt: PromptItem) => {
    onSelect(prompt);
    setSearchQuery('');
    onClose();
  };
  
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {t.dialog.selectPrompt}
          </h2>
          <button
            onClick={onClose}
            className="btn-icon text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.dialog.search}
              className="pl-10 input-field"
              autoFocus
            />
          </div>
        </div>
        
        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {t.dialog.noResults}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPrompts.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => handleSelect(prompt)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <h3 className="font-medium text-gray-900 mb-2">
                    {getDisplayTitle(prompt)}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {getDisplayPrompt(prompt)}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            {t.dialog.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplaceDialog;