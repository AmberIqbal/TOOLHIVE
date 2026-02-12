export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  badge: 'Free' | 'AI Powered' | 'Coming Soon';
  gradient: string;
  available: boolean;
  category: 'image' | 'pdf';
}

export interface ToolConfig {
  maxFileSize: number;
  acceptedFormats: string[];
  processingMode: 'client' | 'server' | 'hybrid';
}
