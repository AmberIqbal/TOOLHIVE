export const resizerConfig = {
  maxFileSize: 10 * 1024 * 1024,
  acceptedFormats: {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
    'image/gif': ['.gif'],
  },
  presets: [
    { name: 'Instagram Square', width: 1080, height: 1080 },
    { name: 'Instagram Portrait', width: 1080, height: 1350 },
    { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    { name: 'Twitter Post', width: 1200, height: 675 },
    { name: 'Facebook Cover', width: 820, height: 312 },
  ],
};
