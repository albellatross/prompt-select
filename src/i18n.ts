import { LanguageTexts } from './types';

export const texts: Record<'en' | 'zh', LanguageTexts> = {
  en: {
    header: {
      title: "Remix Prompter",
      subtitle: "Creative AI Prompt Generator"
    },
    controls: {
    randomize: "🎲 Random 3 Prompts",
    randomizing: "🎲 Randomizing...",
    copyAll: "📋 Copy All 3"
  },
    card: {
      copy: "Copy",
      edit: "Edit",
      save: "Save",
      cancel: "Cancel",
      randomReplace: "🎲 Random",
      selectReplace: "Replace ▾",
      copied: "Copied!",
      editTitle: "Edit title...",
      editPrompt: "Edit prompt..."
    },
    dialog: {
      selectPrompt: "Select a Prompt",
      search: "Search prompts...",
      select: "Select",
      cancel: "Cancel",
      noResults: "No prompts found"
    },
    settings: {
      language: "Language",
      copyMode: "Copy Mode",
      copyPromptOnly: "Prompt Only",
      copyTitleAndPrompt: "Title + Prompt",
      importExport: "Import/Export",
      exportData: "Export Data",
      importData: "Import Data"
    },
    toast: {
      copied: "Copied to clipboard!",
      copiedAll: "All 3 prompts copied to clipboard!",
      saved: "Changes saved!",
      error: "Something went wrong",
      imported: "Data imported successfully!",
      exported: "Data exported to downloads!"
    }
  },
  zh: {
    header: {
      title: "Remix 提示器",
      subtitle: "创意AI提示词生成器"
    },
    controls: {
      randomize: "🎲 随机3个提示词",
      randomizing: "🎲 随机抽取中...",
      copyAll: "📋 复制全部3个"
    },
    card: {
      copy: "复制",
      edit: "编辑",
      save: "保存",
      cancel: "取消",
      randomReplace: "🎲 随机",
      selectReplace: "替换 ▾",
      copied: "已复制！",
      editTitle: "编辑标题...",
      editPrompt: "编辑提示词..."
    },
    dialog: {
      selectPrompt: "选择提示词",
      search: "搜索提示词...",
      select: "选择",
      cancel: "取消",
      noResults: "未找到提示词"
    },
    settings: {
      language: "语言",
      copyMode: "复制模式",
      copyPromptOnly: "仅提示词",
      copyTitleAndPrompt: "标题 + 提示词",
      importExport: "导入/导出",
      exportData: "导出数据",
      importData: "导入数据"
    },
    toast: {
        copied: "已复制到剪贴板！",
        copiedAll: "全部3个提示词已复制到剪贴板！",
        saved: "更改已保存！",
        error: "出现错误",
        imported: "数据导入成功！",
        exported: "数据已导出到下载文件夹！"
      }
  }
};