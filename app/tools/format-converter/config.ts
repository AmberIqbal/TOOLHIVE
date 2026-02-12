export const converterConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  acceptedFormats: {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'image/bmp': ['.bmp'],
  },
  outputFormats: [
    { value: 'png', label: 'PNG', description: 'Lossless, great for graphics & transparency' },
    { value: 'jpg', label: 'JPG', description: 'Smaller size, great for photos' },
    { value: 'webp', label: 'WebP', description: 'Modern format, best compression' },
  ],
};