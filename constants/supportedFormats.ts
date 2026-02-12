export const SUPPORTED_FORMATS = {
  image: {
    compression: ['image/jpeg', 'image/png', 'image/webp'],
    resize: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    conversion: {
      input: ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'],
      output: ['image/jpeg', 'image/png', 'image/webp'],
    },
  },
  
  pdf: {
    toPdf: ['image/jpeg', 'image/png', 'image/webp'],
    toImage: ['application/pdf'],
    compress: ['application/pdf'],
  },
};

export const FORMAT_EXTENSIONS = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'application/pdf': '.pdf',
};
