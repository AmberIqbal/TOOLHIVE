'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ProcessingLoader from '@/components/ProcessingLoader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { downloadFile } from '@/lib/utils/downloadFile';
import { formatFileSize } from '@/lib/utils/formatFileSize';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = 'https://toolhive-api.tech';

export default function BgRemoverTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [processedFile, setProcessedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [processedPreview, setProcessedPreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    setProcessedFile(null);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => setOriginalPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveBg = async () => {
    if (!originalFile) return;

    setIsProcessing(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', originalFile);

      const response = await fetch(`${API_URL}/remove-bg`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to remove background');
      }

      const blob = await response.blob();
      const file = new File([blob], 'removed_bg.png', { type: 'image/png' });
      setProcessedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => setProcessedPreview(e.target?.result as string);
      reader.readAsDataURL(file);

    } catch (err) {
      setError('Failed to remove background. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedFile) {
      downloadFile(processedFile, 'removed_bg.png');
    }
  };

  const reset = () => {
    setOriginalFile(null);
    setProcessedFile(null);
    setOriginalPreview('');
    setProcessedPreview('');
    setError('');
  };

  return (
    <div className="space-y-8">
      {!originalFile && (
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedFormats={{
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
          }}
          maxSize={10 * 1024 * 1024}
          icon="🎨"
        />
      )}

      <AnimatePresence mode="wait">
        {originalFile && !processedFile && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card>
              <h3 className="text-white font-display font-bold mb-4">Original Image</h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                  src={originalPreview}
                  alt="Original"
                  className="max-w-xs max-h-64 rounded-lg object-contain bg-gray-800/50"
                />
                <div className="space-y-2 text-gray-400 font-body text-sm">
                  <p>📁 {originalFile.name}</p>
                  <p>📊 {formatFileSize(originalFile.size)}</p>
                  <p>🖼️ {originalFile.type}</p>
                </div>
              </div>
            </Card>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center font-body"
              >
                {error}
              </motion.div>
            )}

            {isProcessing ? (
              <ProcessingLoader message="Removing background..." />
            ) : (
              <>
                <Button onClick={handleRemoveBg}>
                  🎨 Remove Background
                </Button>
                <button
                  onClick={reset}
                  className="w-full text-gray-400 hover:text-white font-body text-sm transition-colors"
                >
                  ← Choose a different file
                </button>
              </>
            )}
          </motion.div>
        )}

        {processedFile && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-display font-bold text-white mb-4">Original</h3>
                <img
                  src={originalPreview}
                  alt="Original"
                  className="w-full h-64 object-contain rounded-lg bg-gray-800/50"
                />
              </Card>

              <Card highlight>
                <h3 className="text-lg font-display font-bold gradient-text mb-4">
                  Background Removed
                </h3>
                <img
                  src={processedPreview}
                  alt="Processed"
                  className="w-full h-64 object-contain rounded-lg"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #666 25%, transparent 25%), linear-gradient(-45deg, #666 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(-45deg, transparent 75%, #666 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                />
                <p className="text-green-400 font-body text-sm mt-4 text-center">
                  ✓ Transparent background
                </p>
              </Card>
            </div>

            <Button variant="success" onClick={handleDownload}>
              ⬇️ Download Image
            </Button>

            <button
              onClick={reset}
              className="w-full text-gray-400 hover:text-white font-body text-sm transition-colors"
            >
              ← Remove background from another image
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
