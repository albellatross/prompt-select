// Prompt data types
export interface PromptItem {
  id: number;
  title: string;
  prompt: string;
  titleZh?: string;
  promptZh?: string;
}

// App state types
export interface AppState {
  all: PromptItem[];
  shown: PromptItem[];
  copyMode: 'prompt' | 'title+prompt';
  language: 'en' | 'zh';
  isLockScreenEligible?: boolean; // whether current prompt set is for lock screen
}

// Language types
export interface LanguageTexts {
  header: {
    title: string;
    subtitle: string;
  };
  controls: {
    randomize: string;
    randomizing: string;
    copyAll: string;
    copyAllJson: string; // New: copy all as JSON
    lockScreenToggle?: string; // label for lock screen toggle
  };
  card: {
    copy: string;
    edit: string;
    save: string;
    cancel: string;
    randomReplace: string;
    selectReplace: string;
    copied: string;
    editTitle: string;
    editPrompt: string;
  };
  dialog: {
    selectPrompt: string;
    search: string;
    select: string;
    cancel: string;
    noResults: string;
  };
  settings: {
    language: string;
    copyMode: string;
    copyPromptOnly: string;
    copyTitleAndPrompt: string;
    importExport: string;
    exportData: string;
    importData: string;
  };
  toast: {
    copied: string;
    copiedAll: string;
    copiedAllJson?: string; // Optional separate toast for JSON copy
    saved: string;
    error: string;
    imported: string;
    exported: string;
  };
}