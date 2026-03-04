# 🚀 Quick Start Guide

Get ImgToolset running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

This installs Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and all image/PDF processing libraries.

## Step 2: Start Development Server

```bash
npm run dev
```

## Step 3: Open in Browser

Navigate to: **http://localhost:3000**

You should see the ImgToolset landing page! 🎉

## What's Working Right Now

✅ **Image Compressor** - Click and test it immediately!
- Drag & drop any image
- Adjust quality slider
- Compress and download

✅ **Image Resizer** - Also live!
- Upload an image
- Set custom dimensions or use presets
- Resize and download

## Testing the Tools

### Image Compressor
1. Click on "⚡ Image Compressor"
2. Upload any JPG, PNG, or WebP image
3. Adjust quality (10-100%)
4. Click "Compress"
5. Download your compressed image!

### Image Resizer
1. Click on "📐 Image Resizer"
2. Upload any image
3. Set width/height or choose a preset
4. Click "Resize"
5. Download your resized image!

## Next Steps

### 🔨 Complete the Remaining Tools

The foundation is built! To add the remaining tools:

1. **Format Converter** - Use `lib/client/formatConverter.ts`
2. **PDF Tools** - Use `lib/client/pdfToImageClient.ts` and `pdfConverter.ts`
3. **Copy the pattern** from Image Compressor/Resizer

### 🚀 Deploy to Production

**Option 1: Vercel (Easiest)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Option 2: Build Locally**
```bash
npm run build
npm run start
```

## Project Structure Quick Reference

```
📁 app/tools/[tool-name]/
  ├── page.tsx          → Tool page wrapper
  ├── [Tool]Tool.tsx    → Main tool component
  └── config.ts         → Tool-specific settings

📁 components/
  ├── ToolLayout.tsx    → Shared layout for all tools
  ├── FileUpload.tsx    → Drag & drop component
  └── ui/               → Reusable UI components

📁 lib/client/
  └── [processing].ts   → All client-side processing logic
```

## Common Issues

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Dependencies not installing?
```bash
npm cache clean --force
npm install
```

### Hot reload not working?
Just restart the dev server:
```bash
# Ctrl+C to stop
npm run dev
```

## Customization

### Change Colors
Edit `tailwind.config.ts`:
```ts
primary: {
  500: '#YOUR_COLOR',
}
```

### Change Fonts
Edit `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=YourFont');
```

### Add Your Branding
- Logo: `app/page.tsx` (line ~30)
- Title: `app/layout.tsx`
- Footer: `app/page.tsx` (bottom)

## Need Help?

- 📖 Check [README.md](./README.md) for full documentation
- 🐛 Something broken? Open an issue on GitHub
- 💬 Questions? Check Next.js docs: https://nextjs.org/docs

---

**Happy building! 🐝**

*You now have a working Next.js app with 2 tools live and 6 ready to build!*
