import React from 'react';
import { Shuffle, Copy } from 'lucide-react';
import { texts } from '../i18n';

interface ControlsBarProps {
  language: 'en' | 'zh';
  onRandomize: () => void;
  isRandomizing: boolean;
  onCopyAll: () => void;
  onCopyAllJson: () => void; // new prop for JSON copy
  hasPrompts: boolean;
}

const ControlsBar: React.FC<ControlsBarProps> = ({ language, onRandomize, isRandomizing, onCopyAll, onCopyAllJson, hasPrompts }) => {
  const t = texts[language];
  
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={onRandomize}
            disabled={isRandomizing}
            className={`
              flex items-center space-x-2 px-8 py-3 rounded-xl font-medium text-lg
              transition-all duration-200 transform
              ${isRandomizing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
              }
              focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
            `}
          >
            <Shuffle 
              size={24} 
              className={isRandomizing ? 'animate-spin' : ''} 
            />
            <span>
              {isRandomizing ? t.controls.randomizing : t.controls.randomize}
            </span>
          </button>

          {hasPrompts && (
            <>
              <button
                onClick={onCopyAll}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-lg bg-white border-2 border-primary-200 text-primary-700 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <Copy size={20} />
                <span>{t.controls.copyAll}</span>
              </button>
              <button
                onClick={onCopyAllJson}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-lg bg-white border-2 border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Copy size={20} />
                <span>{t.controls.copyAllJson}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlsBar;