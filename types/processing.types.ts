export type ProcessingMode = 'client' | 'server';

export interface ProcessingStatus {
  isProcessing: boolean;
  progress: number;
  mode: ProcessingMode;
  error?: string;
}

export interface ProcessingResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  mode: ProcessingMode;
}
