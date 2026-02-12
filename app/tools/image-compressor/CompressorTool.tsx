'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ImagePreview from '@/components/ImagePreview';
import ProcessingLoader from '@/components/ProcessingLoader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { compressImageClient } from '@/lib/client/browserCompression';
import { downloadFile } from '@/lib/utils/downloadFile';
import { formatFileSize } from '@/lib/utils/formatFileSize';
import { compressorConfig } from './config';
import { motion, AnimatePresence } from 'framer-motion';

export default function CompressorTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [compressedPreview, setCompressedPreview] = useState<string>('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState(80);
  const [compressionRatio, setCompressionRatio] = useState<number | null>(null);

  const handleFileSelect = async (file: File) => {
    setOriginalFile(file);
    setCompressedFile(null);
    setCompressionRatio(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = async () => {
    if (!originalFile) return;

    setIsCompressing(true);
    
    try {
      const result = await compressImageClient(originalFile, quality / 100);
      
      setCompressedFile(result.file);
      setCompressionRatio(result.compressionRatio);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setCompressedPreview(e.target?.result as string);
      };
      reader.readAsDataURL(result.file);
      
    } catch (error) {
      console.error('Compression failed:', error);
      alert('Failed to compress image. Please try again.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (compressedFile && originalFile) {
      downloadFile(compressedFile, `compressed_${originalFile.name}`);
    }
  };

  const reset = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setOriginalPreview('');
    setCompressedPreview('');
    setCompressionRatio(null);
  };

  return (
    <div className="space-y-8">
      {!originalFile && (
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedFormats={compressorConfig.acceptedFormats}
          maxSize={compressorConfig.maxFileSize}
          icon="⚡"
        />
      )}

      <AnimatePresence mode="wait">
        {originalFile && !compressedFile && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <ImagePreview 
              file={originalFile} 
              preview={originalPreview}
              title="Original Image"
            />

            <Card>
              <label className="block text-white font-display font-bold mb-4">
                Compression Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-gray-500 font-body mt-2">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>
            </Card>

            {isCompressing ? (
              <ProcessingLoader message="Compressing..." />
            ) : (
              <>
                <Button onClick={compressImage}>
                  ⚡ Compress Image
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

        {compressedFile && (
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
                  className="w-full h-48 object-contain rounded-lg mb-4"
                />
                <p className="text-gray-400 font-body text-sm">
                  <span className="font-bold text-white">
                    {formatFileSize(originalFile!.size)}
                  </span>
                </p>
              </Card>

              <Card highlight>
                <h3 className="text-lg font-display font-bold gradient-text mb-4">Compressed</h3>
                <img 
                  src={compressedPreview} 
                  alt="Compressed" 
                  className="w-full h-48 object-contain rounded-lg mb-4"
                />
                <div className="text-gray-400 font-body text-sm">
                  <p className="font-bold text-green-400">
                    {formatFileSize(compressedFile.size)}
                  </p>
                  {compressionRatio !== null && (
                    <p className="text-green-400 mt-1">
                      ↓ {compressionRatio.toFixed(1)}% smaller
                    </p>
                  )}
                </div>
              </Card>
            </div>

            <Button variant="success" onClick={handleDownload}>
              ⬇️ Download Compressed Image
            </Button>

            <button
              onClick={reset}
              className="w-full text-gray-400 hover:text-white font-body text-sm transition-colors"
            >
              ← Compress another image
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
