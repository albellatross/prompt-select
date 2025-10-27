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
  isLockScreenEligible: boolean;
  onToggleLockScreen: () => void;
}

const ControlsBar: React.FC<ControlsBarProps> = ({ language, onRandomize, isRandomizing, onCopyAll, onCopyAllJson, hasPrompts, isLockScreenEligible, onToggleLockScreen }) => {
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
            <div className="flex items-center space-x-3">
              <button
                onClick={onCopyAll}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl font-medium text-base bg-white border-2 border-primary-200 text-primary-700 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                <Copy size={18} />
                <span>{t.controls.copyAll}</span>
              </button>
              <button
                onClick={onCopyAllJson}
                className="flex items-center space-x-2 px-5 py-3 rounded-xl font-medium text-base bg-white border-2 border-indigo-200 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <Copy size={18} />
                <span>{t.controls.copyAllJson}</span>
              </button>
              <button
                onClick={onToggleLockScreen}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium text-base transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLockScreenEligible ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500' : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 focus:ring-gray-400'}`}
                title={t.controls.lockScreenToggle || 'Lockscreen'}
              >
                <span>{t.controls.lockScreenToggle}</span>
                <span className={`ml-1 inline-block w-2.5 h-2.5 rounded-full ${isLockScreenEligible ? 'bg-white' : 'bg-gray-400'}`}></span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlsBar;