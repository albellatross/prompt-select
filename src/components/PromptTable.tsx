import React, { useState } from 'react';
import { Copy, Edit3, Save, X, Shuffle, ChevronDown, Check } from 'lucide-react';
import { PromptItem } from '../types';
import { texts } from '../i18n';

interface PromptTableProps {
  prompts: PromptItem[];
  language: 'en' | 'zh';
  copyMode: 'prompt' | 'title+prompt';
  onCopy: (content: string) => void;
  onSave: (id: number, title: string, prompt: string) => void;
  onRandomReplace: (id: number) => void;
  onSelectReplace: (id: number) => void;
}

const PromptTable: React.FC<PromptTableProps> = ({
  prompts,
  language,
  copyMode,
  onCopy,
  onSave,
  onRandomReplace,
  onSelectReplace
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ title: string; prompt: string }>({ title: '', prompt: '' });
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  const t = texts[language];
  
  const handleEdit = (prompt: PromptItem) => {
    setEditingId(prompt.id);
    setEditData({ 
      title: language === 'zh' && prompt.titleZh ? prompt.titleZh : prompt.title,
      prompt: language === 'zh' && prompt.promptZh ? prompt.promptZh : prompt.prompt 
    });
  };
  
  const handleSave = () => {
    if (editingId && editData.title.trim() && editData.prompt.trim()) {
      onSave(editingId, editData.title.trim(), editData.prompt.trim());
      setEditingId(null);
    }
  };
  
  const handleCancel = () => {
    setEditingId(null);
    setEditData({ title: '', prompt: '' });
  };
  
  const handleCopy = (prompt: PromptItem) => {
    const title = language === 'zh' && prompt.titleZh ? prompt.titleZh : prompt.title;
    const promptText = language === 'zh' && prompt.promptZh ? prompt.promptZh : prompt.prompt;
    
    const content = copyMode === 'prompt' 
      ? promptText 
      : `${title}\n${promptText}`;
      
    onCopy(content);
    setCopiedId(prompt.id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const getDisplayTitle = (prompt: PromptItem) => {
    return language === 'zh' && prompt.titleZh ? prompt.titleZh : prompt.title;
  };
  
  const getDisplayPrompt = (prompt: PromptItem) => {
    return language === 'zh' && prompt.promptZh ? prompt.promptZh : prompt.prompt;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'zh' ? '标题' : 'Title'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prompt
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                {language === 'zh' ? '操作' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {prompts.map((prompt, index) => (
              <tr key={prompt.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  {editingId === prompt.id ? (
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder={t.card.editTitle}
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900 max-w-xs">
                      {getDisplayTitle(prompt)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === prompt.id ? (
                    <textarea
                      value={editData.prompt}
                      onChange={(e) => setEditData(prev => ({ ...prev, prompt: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                      rows={3}
                      placeholder={t.card.editPrompt}
                    />
                  ) : (
                    <div className="text-sm text-gray-700 max-w-md line-clamp-2">
                      {getDisplayPrompt(prompt)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {editingId === prompt.id ? (
                      <>
                        <button
                          onClick={handleSave}
                          disabled={!editData.title.trim() || !editData.prompt.trim()}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          title={t.card.save}
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          title={t.card.cancel}
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleCopy(prompt)}
                          className={`p-2 rounded-lg transition-colors duration-200 ${
                            copiedId === prompt.id 
                              ? 'text-green-600 bg-green-50' 
                              : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                          }`}
                          title={t.card.copy}
                        >
                          {copiedId === prompt.id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                        <button
                          onClick={() => handleEdit(prompt)}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                          title={t.card.edit}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => onRandomReplace(prompt.id)}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                          title={t.card.randomReplace}
                        >
                          <Shuffle size={16} />
                        </button>
                        <button
                          onClick={() => onSelectReplace(prompt.id)}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                          title={t.card.selectReplace}
                        >
                          <ChevronDown size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden divide-y divide-gray-200">
        {prompts.map((prompt, index) => (
          <div key={prompt.id} className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 text-sm font-medium">
                  {index + 1}
                </span>
                <div className="flex-1">
                  {editingId === prompt.id ? (
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder={t.card.editTitle}
                    />
                  ) : (
                    <h3 className="text-sm font-medium text-gray-900">
                      {getDisplayTitle(prompt)}
                    </h3>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {editingId === prompt.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={!editData.title.trim() || !editData.prompt.trim()}
                      className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title={t.card.save}
                    >
                      <Save size={16} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      title={t.card.cancel}
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleCopy(prompt)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        copiedId === prompt.id 
                          ? 'text-green-600 bg-green-50' 
                          : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                      title={t.card.copy}
                    >
                      {copiedId === prompt.id ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <button
                      onClick={() => handleEdit(prompt)}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      title={t.card.edit}
                    >
                      <Edit3 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              {editingId === prompt.id ? (
                <textarea
                  value={editData.prompt}
                  onChange={(e) => setEditData(prev => ({ ...prev, prompt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  rows={4}
                  placeholder={t.card.editPrompt}
                />
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed">
                  {getDisplayPrompt(prompt)}
                </p>
              )}
            </div>
            
            {editingId !== prompt.id && (
              <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => onRandomReplace(prompt.id)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                >
                  <Shuffle size={14} />
                  <span>{t.card.randomReplace}</span>
                </button>
                <button
                  onClick={() => onSelectReplace(prompt.id)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                >
                  <span>{t.card.selectReplace}</span>
                  <ChevronDown size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptTable;