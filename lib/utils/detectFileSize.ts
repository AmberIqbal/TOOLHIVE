import { FILE_LIMITS } from '@/constants/fileLimits';
import { ProcessingMode } from '@/types/processing.types';

export function detectProcessingMode(
  fileSize: number,
  fileType: 'image' | 'pdf'
): ProcessingMode {
  const limit = fileType === 'image' 
    ? FILE_LIMITS.image.CLIENT_MAX 
    : FILE_LIMITS.pdf.CLIENT_MAX;
  
  return fileSize <= limit ? 'client' : 'server';
}

export function shouldUseServer(fileSize: number, fileType: 'image' | 'pdf'): boolean {
  return detectProcessingMode(fileSize, fileType) === 'server';
}
