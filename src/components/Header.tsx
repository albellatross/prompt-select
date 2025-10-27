import React from 'react';
import { Settings } from 'lucide-react';
import { texts } from '../i18n';

interface HeaderProps {
  language: 'en' | 'zh';
  onLanguageChange: (lang: 'en' | 'zh') => void;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, onSettingsClick }) => {
  const t = texts[language];
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🎨</div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {t.header.title}
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                {t.header.subtitle}
              </p>
            </div>
          </div>
          
          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  language === 'en' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('zh')}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                  language === 'zh' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                中文
              </button>
            </div>
            
            {/* Settings Button */}
            <button
              onClick={onSettingsClick}
              className="btn-icon text-gray-600 hover:text-gray-900"
              aria-label={t.settings.language}
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;