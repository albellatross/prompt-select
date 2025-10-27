# Remix Prompter 🎨

A minimalist, elegant prompt randomizer designed for creative AI workflows. Generate, edit, and manage creative prompts with a clean, European-inspired interface.

🌐 **Live Demo**: https://albellatross.github.io/prompt-select/

🌐 **Live Demo**: [https://albellatross.github.io/prompt-select/](https://albellatross.github.io/prompt-select/)

## ✨ Features

- **🎲 Random Generation**: Instantly generate 3 unique prompts from your collection
- **📋 One-Click Copy**: Copy prompts or title+prompt combinations to clipboard
 - **📋 One-Click Copy**: Copy prompts or title+prompt combinations to clipboard
 - **🧾 JSON Export Copy**: Instant copy of current 3 prompts as structured JSON `[ { label, prompt }, ... ]`
- **✏️ Inline Editing**: Edit prompts directly with intuitive save/cancel controls  
- **🔄 Smart Replacement**: Replace individual prompts randomly or by selection
- **🌍 Bilingual Support**: Seamless switching between English and Chinese
- **� Table View**: Clean, organized table layout with responsive design
- **📱 Mobile Optimized**: Perfect experience on desktop, tablet, and mobile
- **💾 Local Storage**: Preferences automatically saved to your browser

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Modern web browser

### Installation & Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**:
   The app will automatically open at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run preview
```

## 🎯 Usage

1. **Generate Prompts**: Click "🎲 Random 3 Prompts" to get started
2. **Copy Content**: Use the copy button on any prompt card
    - Use the top bar buttons:
       - 📋 Copy All 3 – Rich text (bold title + prompt, multi-format clipboard)
       - 📋 Copy JSON – Structured array like:
          ```json
          [
             {
                "label": "Switch to Anime Look",
                "prompt": "Create this picture as an anime illustration, with expressive light, dynamic layout."
             },
             {
                "label": "Change to Pop Art",
                "prompt": "Create this picture as a high-saturation pop art, with bold blocks and hues."
             }
          ]
          ```
3. **Edit Prompts**: Click edit to modify titles and prompt text inline
4. **Replace Individual**: Use "🎲 Random" for random replacement or "Replace ▾" for selection
5. **Switch Languages**: Toggle between English and Chinese in the header
6. **Customize Copy Mode**: Choose between copying prompt only or title+prompt

## 🛠️ Tech Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Lucide React** - Beautiful, customizable icons

## 🎨 Design Philosophy

- **Minimalism**: Clean, uncluttered interface focusing on content
- **European Aesthetics**: Sophisticated typography and spacing
- **Accessibility**: Keyboard navigation and screen reader support
- **Performance**: Optimized animations and efficient state management

## 📝 Prompt Management

The app comes with 26 built-in creative prompts covering various artistic styles:
- Traditional art techniques (Watercolor, Impressionism, etc.)
- Digital art styles (Pixel Art, Glitch, etc.)
- Cultural styles (Ukiyo-e, Chinese Paper Cut, etc.)
- Modern techniques (3D Render, Gradient Mesh, etc.)

## 🔧 Configuration

### Environment Variables
No environment variables required - everything runs locally!

### Customization
- Modify `src/data.ts` to change default prompts
- Update `src/i18n.ts` to add more languages
- Customize styles in `tailwind.config.js`

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🎯 Roadmap

- [ ] Import/Export functionality
- [ ] Custom prompt collections
- [ ] Tag-based filtering
- [ ] Favorites system
- [ ] Cloud sync (optional)
- [ ] API integration for prompt sources

---

Made with ❤️ for the creative community