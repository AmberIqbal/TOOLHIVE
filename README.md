# 🐝 ToolHive - All-in-One Creative Tools

A modern, high-performance Next.js 14 application providing essential creative tools for digital creators. Built with TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

### ✅ Live Tools (Client-Side, 100% Free)
- **⚡ Image Compressor** - Reduce file size without quality loss
- **📐 Image Resizer** - Resize with custom dimensions or presets

### 🚧 Coming Soon (Client-Side)
- **🔄 Format Converter** - PNG, JPG, WebP conversion
- **📄 PDF to Image** - Convert PDF pages to images
- **📑 PDF Converter** - Images to PDF
- **📦 PDF Compressor** - Reduce PDF file size

### 🔑 API-Based Tools (Requires API Keys)
- **🎨 Background Remover** - AI-powered (Remove.bg)
- **✨ Image Upscaler** - AI enhancement (Replicate)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org))
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
http://localhost:3000
```

That's it! The app is now running with 2 fully working tools! 🎉

## 📁 Project Structure

```
toolhive/
├── app/
│   ├── api/                    # API routes (for bg-remover & upscaler)
│   ├── tools/                  # Tool pages
│   │   ├── image-compressor/   ✅ WORKING
│   │   ├── image-resizer/      ✅ WORKING
│   │   ├── format-converter/   🚧 Coming soon
│   │   ├── pdf-to-image/       🚧 Coming soon
│   │   ├── pdf-converter/      🚧 Coming soon
│   │   ├── pdf-compressor/     🚧 Coming soon
│   │   ├── bg-remover/         🔑 Needs API key
│   │   └── image-upscaler/     🔑 Needs API key
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/                 # Reusable UI components
├── hooks/                      # Custom React hooks
├── lib/
│   ├── client/                 # Browser-only processing
│   ├── server/                 # Server-side logic
│   ├── api/                    # API client functions
│   └── utils/                  # Helper functions
├── constants/                  # Config & constants
├── types/                      # TypeScript types
└── public/                     # Static assets
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Image Processing**: browser-image-compression
- **PDF**: pdf-lib, pdfjs-dist, jsPDF
- **File Upload**: react-dropzone

## 🛠️ Development Roadmap

### ✅ Phase 1: Foundation (Completed)
- [x] Next.js setup
- [x] Landing page
- [x] Routing structure
- [x] Reusable components

### ✅ Phase 2: First Tools (Completed)
- [x] Image Compressor (LIVE)
- [x] Image Resizer (LIVE)

### 🔄 Phase 3: Remaining Client-Side Tools (In Progress)
- [ ] Format Converter
- [ ] PDF to Image
- [ ] PDF Converter
- [ ] PDF Compressor

### 🔜 Phase 4: AI Tools (Requires API Keys)
- [ ] Background Remover API integration
- [ ] Image Upscaler API integration

### 🎯 Phase 5: Polish & Launch
- [ ] Performance optimization
- [ ] Mobile testing
- [ ] SEO optimization
- [ ] Deploy to Vercel

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy on Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel auto-detects Next.js
- Click Deploy!

3. **Add Environment Variables** (for API tools later)
```
NEXT_PUBLIC_REMOVE_BG_API_KEY=your_key
NEXT_PUBLIC_UPSCALER_API_KEY=your_key
```

### Local Production Build

```bash
npm run build
npm run start
```

## 🔑 API Keys (Optional - For AI Tools)

### Background Remover
1. Sign up at [Remove.bg](https://remove.bg/api)
2. Get your API key
3. Add to `.env.local`: `NEXT_PUBLIC_REMOVE_BG_API_KEY=your_key`

### Image Upscaler
1. Sign up at [Replicate](https://replicate.com)
2. Get your API token
3. Add to `.env.local`: `NEXT_PUBLIC_UPSCALER_API_KEY=your_key`

## 💻 Development

### Adding a New Tool

1. **Create tool directory**
```bash
mkdir app/tools/your-tool-name
```

2. **Create page.tsx**
```tsx
import ToolLayout from '@/components/ToolLayout';
import YourTool from './YourTool';

export default function YourToolPage() {
  return (
    <ToolLayout
      title="Your Tool Name"
      description="What it does"
      icon="🎯"
    >
      <YourTool />
    </ToolLayout>
  );
}
```

3. **Add to constants/toolConfig.ts**
```ts
{
  id: 'your-tool-name',
  name: 'Your Tool Name',
  description: 'Description',
  icon: '🎯',
  badge: 'Free',
  gradient: 'from-blue-500 to-cyan-500',
  available: true,
  category: 'image',
}
```

### Running Tests

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint
```

## 📖 Documentation

- **Component Guidelines**: See comments in `/components`
- **Utility Functions**: Check `/lib/utils`
- **Type Definitions**: Review `/types`

## 🎯 Design Philosophy

- **Client-First**: Process on device when possible (privacy + speed)
- **Progressive Enhancement**: Start simple, add features incrementally
- **Smart Fallbacks**: Use API only when client can't handle it
- **Beautiful UX**: Smooth animations, clear feedback, intuitive flow

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - Use freely for personal or commercial projects

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations

## 💡 Support

- ⭐ Star the repository
- 🐛 Report bugs via Issues
- 💬 Ask questions in Discussions

---

**Built with ❤️ using Next.js | Making creativity effortless 🐝**

*Current Status: 2 tools live, 6 coming soon!*
