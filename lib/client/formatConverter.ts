import { ConversionOptions } from '@/types/file.types';

export async function convertFormatClient(
  file: File,
  options: ConversionOptions
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const mimeType = `image/${options.format}`;
      const quality = options.quality || 0.95;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const fileName = file.name.replace(/\.[^/.]+$/, `.${options.format}`);
            const convertedFile = new File([blob], fileName, { type: mimeType });
            resolve(convertedFile);
          } else {
            reject(new Error('Canvas to Blob conversion failed'));
          }
        },
        mimeType,
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    reader.onerror = () => reject(new Error('Failed to read file'));
    
    reader.readAsDataURL(file);
  });
}
