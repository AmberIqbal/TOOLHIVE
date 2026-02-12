'use client';

import { formatFileSize } from '@/lib/utils/formatFileSize';
import Card from './ui/Card';

interface ImagePreviewProps {
  file: File;
  preview: string;
  title?: string;
  highlight?: boolean;
}

export default function ImagePreview({ file, preview, title, highlight }: ImagePreviewProps) {
  return (
    <Card highlight={highlight}>
      {title && (
        <h3 className="text-lg font-display font-bold text-white mb-4">
          {title}
        </h3>
      )}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img 
          src={preview} 
          alt={title || 'Preview'} 
          className="max-w-xs max-h-64 rounded-lg object-contain"
        />
        <div className="space-y-2 text-gray-400 font-body text-sm">
          <p>📁 {file.name}</p>
          <p>📊 {formatFileSize(file.size)}</p>
          <p>🖼️ {file.type}</p>
        </div>
      </div>
    </Card>
  );
}
