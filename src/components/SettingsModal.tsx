import React from 'react';
import { X } from 'lucide-react';
import { texts } from '../i18n';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'zh';
  copyMode: 'prompt' | 'title+prompt';
  onCopyModeChange: (mode: 'prompt' | 'title+prompt') => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  language,
  copyMode,
  onCopyModeChange
}) => {
  const t = texts[language];
  
  if (!isOpen) return null;
  
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
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {t.settings.language === "语言" ? "设置" : "Settings"}
          </h2>
          <button
            onClick={onClose}
            className="btn-icon text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Copy Mode Setting */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              {t.settings.copyMode}
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="copyMode"
                  value="prompt"
                  checked={copyMode === 'prompt'}
                  onChange={() => onCopyModeChange('prompt')}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {t.settings.copyPromptOnly}
                  </div>
                  <div className="text-sm text-gray-500">
                    {language === 'zh' ? '仅复制提示词内容' : 'Copy prompt text only'}
                  </div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="copyMode"
                  value="title+prompt"
                  checked={copyMode === 'title+prompt'}
                  onChange={() => onCopyModeChange('title+prompt')}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {t.settings.copyTitleAndPrompt}
                  </div>
                  <div className="text-sm text-gray-500">
                    {language === 'zh' ? '复制真正的粗体标题和提示词（支持富文本）' : 'Copy real bold title and prompt (rich text supported)'}
                  </div>
                </div>
              </label>
            </div>
          </div>
          
          {/* Copy Format Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              {language === 'zh' ? '复制格式预览：' : 'Copy Format Preview:'}
            </h4>
            <div className="text-xs text-gray-600 font-mono bg-white p-3 rounded border max-h-32 overflow-y-auto">
              {copyMode === 'prompt' ? (
                language === 'zh' ? 
                '将这张图片制作成水彩画。\n\n创建一个微观细节特写聚焦变体。\n\n将这张图片制作成现代剪纸风格，具有分层的颜色和柔和的阴影。' : 
                'Create this picture as a watercolor painting.\n\nCreate a micro-detail close-up focus variant.\n\nCreate this picture as a modern paper cut, with layered colors and soft shadows.'
              ) : (
                language === 'zh' ? 
                '**改为水彩画**\n将这张图片制作成水彩画。\n\n**放大到细节**\n创建一个微观细节特写聚焦变体。\n\n**切换到剪纸风格**\n将这张图片制作成现代剪纸风格，具有分层的颜色和柔和的阴影。' : 
                '**Change to Watercolor**\nCreate this picture as a watercolor painting.\n\n**Zoom into Detail**\nCreate a micro-detail close-up focus variant.\n\n**Switch to Paper Cut**\nCreate this picture as a modern paper cut, with layered colors and soft shadows.'
              )}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary"
          >
            {language === 'zh' ? '完成' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;