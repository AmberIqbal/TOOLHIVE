export interface ProcessedFile {
  file: File;
  preview?: string;
  size: number;
  type: string;
  name: string;
}

export interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  file: File;
}

export interface ResizeOptions {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
}

export interface ConversionOptions {
  format: 'png' | 'jpg' | 'webp';
  quality?: number;
}
