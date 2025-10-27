import React, { useState } from 'react';
import { Copy, Edit3, Save, X, Shuffle, ChevronDown, Check } from 'lucide-react';
import { PromptItem } from '../types';
import { texts } from '../i18n';

interface PromptCardProps {
  prompt: PromptItem;
  language: 'en' | 'zh';
  copyMode: 'prompt' | 'title+prompt';
  onCopy: (content: string) => void;
  onSave: (id: number, title: string, prompt: string) => void;
  onRandomReplace: (id: number) => void;
  onSelectReplace: (id: number) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  language,
  copyMode,
  onCopy,
  onSave,
  onRandomReplace,
  onSelectReplace
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(prompt.title);
  const [editPrompt, setEditPrompt] = useState(prompt.prompt);
  const [justCopied, setJustCopied] = useState(false);
  
  const t = texts[language];
  
  const handleCopy = () => {
    const content = copyMode === 'prompt' 
      ? prompt.prompt 
      : `${prompt.title}\n${prompt.prompt}`;
    onCopy(content);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  };
  
  const handleSave = () => {
    if (editTitle.trim() && editPrompt.trim()) {
      onSave(prompt.id, editTitle.trim(), editPrompt.trim());
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    setEditTitle(prompt.title);
    setEditPrompt(prompt.prompt);
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };
  
  return (
    <div className="card p-6 animate-fade-in">
      {/* Header with actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 mr-4">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="input-field font-medium text-lg"
              placeholder={t.card.editTitle}
              autoFocus
            />
          ) : (
            <h3 className="font-medium text-lg text-gray-900 leading-tight">
              {prompt.title}
            </h3>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                disabled={!editTitle.trim() || !editPrompt.trim()}
                className="btn-icon text-green-600 hover:text-green-700 hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed"
                title={t.card.save}
              >
                <Save size={18} />
              </button>
              <button
                onClick={handleCancel}
                className="btn-icon text-gray-600 hover:text-gray-700"
                title={t.card.cancel}
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCopy}
                className={`btn-icon transition-all duration-200 ${
                  justCopied 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
                title={t.card.copy}
              >
                {justCopied ? <Check size={18} /> : <Copy size={18} />}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="btn-icon text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                title={t.card.edit}
              >
                <Edit3 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="mb-4">
        {isEditing ? (
          <textarea
            value={editPrompt}
            onChange={(e) => setEditPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            className="textarea-field min-h-[120px]"
            placeholder={t.card.editPrompt}
          />
        ) : (
          <p className="text-gray-700 leading-relaxed text-sm">
            {prompt.prompt}
          </p>
        )}
      </div>
      
      {/* Actions */}
      {!isEditing && (
        <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
          <button
            onClick={() => onRandomReplace(prompt.id)}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
          >
            <Shuffle size={16} />
            <span>{t.card.randomReplace}</span>
          </button>
          
          <button
            onClick={() => onSelectReplace(prompt.id)}
            className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
          >
            <span>{t.card.selectReplace}</span>
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;