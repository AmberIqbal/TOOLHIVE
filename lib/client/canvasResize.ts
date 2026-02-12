import { ResizeOptions } from '@/types/file.types';

export async function resizeImageClient(
  file: File,
  options: ResizeOptions
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

      let targetWidth = options.width;
      let targetHeight = options.height;

      // Maintain aspect ratio if requested
      if (options.maintainAspectRatio) {
        const aspectRatio = img.width / img.height;
        
        if (targetWidth && targetHeight) {
          // Both provided - fit within bounds maintaining aspect ratio
          const targetRatio = targetWidth / targetHeight;
          if (targetRatio > aspectRatio) {
            // Height is the limiting factor
            targetWidth = Math.round(targetHeight * aspectRatio);
          } else {
            // Width is the limiting factor
            targetHeight = Math.round(targetWidth / aspectRatio);
          }
        } else if (targetWidth && !targetHeight) {
          // Only width provided
          targetHeight = Math.round(targetWidth / aspectRatio);
        } else if (targetHeight && !targetWidth) {
          // Only height provided
          targetWidth = Math.round(targetHeight * aspectRatio);
        }
      }

      // Ensure we have valid dimensions
      if (!targetWidth || !targetHeight || targetWidth <= 0 || targetHeight <= 0) {
        reject(new Error('Invalid dimensions'));
        return;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Use better image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob((blob) => {
        if (blob) {
          const resizedFile = new File([blob], file.name, { type: file.type });
          resolve(resizedFile);
        } else {
          reject(new Error('Canvas to Blob conversion failed'));
        }
      }, file.type, 0.95);
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    reader.onerror = () => reject(new Error('Failed to read file'));
    
    reader.readAsDataURL(file);
  });
}
