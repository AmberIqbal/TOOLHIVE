import imageCompression from 'browser-image-compression';
import { CompressionResult } from '@/types/file.types';

export async function compressImageClient(
  file: File,
  quality: number = 0.8
): Promise<CompressionResult> {
  const originalSize = file.size;
  
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: quality,
  };

  const compressedFile = await imageCompression(file, options);
  
  return {
    originalSize,
    compressedSize: compressedFile.size,
    compressionRatio: ((originalSize - compressedFile.size) / originalSize) * 100,
    file: compressedFile,
  };
}
