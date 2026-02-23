export const compressorConfig = {
  maxFileSize: 20 * 1024 * 1024, 
  acceptedFormats: {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'image/webp': ['.webp'],
  },
  qualityPresets: {
    low: { value: 60, label: 'Small File' },
    medium: { value: 80, label: 'Balanced' },
    high: { value: 90, label: 'High Quality' },
  },
};
