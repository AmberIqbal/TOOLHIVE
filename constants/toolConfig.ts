import { Tool } from '@/types/tool.types';

export const TOOLS: Tool[] = [
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce file size without losing quality. Perfect for web optimization',
    icon: '⚡',
    badge: 'Free',
    gradient: 'from-blue-500 to-cyan-500',
    available: true,
    category: 'image',
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize images to any dimension while maintaining aspect ratio',
    icon: '📐',
    badge: 'Free',
    gradient: 'from-green-500 to-emerald-500',
    available: true,
    category: 'image',
  },
  {
    id: 'format-converter',
    name: 'Format Converter',
    description: 'Convert between PNG, JPG, WebP and other formats instantly',
    icon: '🔄',
    badge: 'Free',
    gradient: 'from-indigo-500 to-purple-500',
    available: true,
    category: 'image',
  },
  {
    id: 'bg-remover',
    name: 'Background Remover',
    description: 'Remove backgrounds from images instantly with AI precision',
    icon: '🎨',
    badge: 'AI Powered',
    gradient: 'from-purple-500 to-pink-500',
    available: false,
    category: 'image'
  },
];
