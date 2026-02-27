'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
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
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [quality, setQuality] = useState(80);

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    setCompressedFile(null);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => setOriginalPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleCompress = async () => {
    if (!originalFile) return;

    setIsProcessing(true);
    setError('');

    try {
      const result = await compressImageClient(originalFile, quality / 100);
      setCompressedFile(result.file);

      const reader = new FileReader();
      reader.onload = (e) => setCompressedPreview(e.target?.result as string);
      reader.readAsDataURL(result.file);
    } catch (err) {
      setError('Failed to compress image. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (compressedFile) {
      downloadFile(compressedFile, `compressed_${originalFile?.name}`);
    }
  };

  const reset = () => {
    setOriginalFile(null);
    setCompressedFile(null);
    setOriginalPreview('');
    setCompressedPreview('');
    setError('');
    setQuality(80);
  };

  const getSavings = () => {
    if (!originalFile || !compressedFile) return 0;
    return Math.round(((originalFile.size - compressedFile.size) / originalFile.size) * 100);
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
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card>
              <h3 className="text-xl font-bold text-blue-900 mb-4">Original Image</h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                  src={originalPreview}
                  alt="Original"
                  className="max-w-xs max-h-64 rounded-lg object-contain bg-gray-100"
                />
                <div className="space-y-2 text-gray-600 text-sm">
                  <p>📁 {originalFile.name}</p>
                  <p>📊 {formatFileSize(originalFile.size)}</p>
                </div>
              </div>
            </Card>

            <Card highlight>
              <h3 className="text-xl font-bold text-blue-900 mb-6">Compression Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Quality: {quality}%
                  </label>
                  <span className="text-xs text-gray-500">
                    {quality >= 90 ? 'Best' : quality >= 70 ? 'Good' : quality >= 50 ? 'Medium' : 'Low'}
                  </span>
                </div>

                {/* Custom Styled Slider */}
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-3 bg-blue-100 rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${quality}%, #dbeafe ${quality}%, #dbeafe 100%)`
                    }}
                  />
                  <style jsx>{`
                    .slider-thumb::-webkit-slider-thumb {
                      appearance: none;
                      width: 24px;
                      height: 24px;
                      background: #2563eb;
                      border: 3px solid white;
                      border-radius: 50%;
                      cursor: pointer;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                    }
                    .slider-thumb::-webkit-slider-thumb:hover {
                      background: #1e40af;
                    }
                    .slider-thumb::-moz-range-thumb {
                      width: 24px;
                      height: 24px;
                      background: #2563eb;
                      border: 3px solid white;
                      border-radius: 50%;
                      cursor: pointer;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                    }
                    .slider-thumb::-moz-range-thumb:hover {
                      background: #1e40af;
                    }
                  `}</style>
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  <p className="font-medium mb-1">💡 Tip:</p>
                  <p>70-85% quality provides the best balance between file size and visual quality for web use.</p>
                </div>
              </div>
            </Card>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 text-center font-medium"
              >
                {error}
              </motion.div>
            )}

            {isProcessing ? (
              <ProcessingLoader message="Compressing image..." />
            ) : (
              <>
                <Button onClick={handleCompress}>
                  ⚡ Compress Image
                </Button>
                <button
                  onClick={reset}
                  className="w-full text-gray-500 hover:text-gray-700 text-sm transition"
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
            <Card highlight>
              <div className="text-center mb-6">
                <div className="text-5xl font-black text-green-600 mb-2">
                  {getSavings()}%
                </div>
                <p className="text-gray-600 font-medium">File size reduced!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Original Size</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatFileSize(originalFile!.size)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Compressed Size</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatFileSize(compressedFile.size)}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <span>Saved: {formatFileSize(originalFile!.size - compressedFile.size)}</span>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-bold text-blue-900 mb-4">Before</h3>
                <img
                  src={originalPreview}
                  alt="Original"
                  className="w-full h-64 object-contain rounded-lg bg-gray-100"
                />
              </Card>

              <Card>
                <h3 className="text-lg font-bold text-blue-900 mb-4">After</h3>
                <img
                  src={compressedPreview}
                  alt="Compressed"
                  className="w-full h-64 object-contain rounded-lg bg-gray-100"
                />
              </Card>
            </div>

            <Button variant="success" onClick={handleDownload}>
              ⬇️ Download Compressed Image
            </Button>

            <button
              onClick={reset}
              className="w-full text-gray-500 hover:text-gray-700 text-sm transition"
            >
              ← Compress another image
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
