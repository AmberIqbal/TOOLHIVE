'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ProcessingLoader from '@/components/ProcessingLoader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { resizeImageClient  } from '@/lib/client/canvasResize';
import { downloadFile } from '@/lib/utils/downloadFile';
import { formatFileSize } from '@/lib/utils/formatFileSize';
import { resizerConfig } from './config';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResizerTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resizedFile, setResizedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [resizedPreview, setResizedPreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    setResizedFile(null);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = e.target?.result as string;
      setOriginalPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePresetClick = (presetWidth: number, presetHeight: number) => {
    setWidth(presetWidth);
    setHeight(presetHeight);
    setMaintainAspectRatio(false);
  };

  const handleResize = async () => {
    if (!originalFile) return;

    setIsProcessing(true);
    setError('');

    try {
      const resized = await resizeImageClient (originalFile,{width, height, maintainAspectRatio} );
      setResizedFile(resized);

      const reader = new FileReader();
      reader.onload = (e) => setResizedPreview(e.target?.result as string);
      reader.readAsDataURL(resized);
    } catch (err) {
      setError('Failed to resize image. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (resizedFile) {
      downloadFile(resizedFile, `resized_${width}x${height}_${originalFile?.name}`);
    }
  };

  const reset = () => {
    setOriginalFile(null);
    setResizedFile(null);
    setOriginalPreview('');
    setResizedPreview('');
    setError('');
    setWidth(1920);
    setHeight(1080);
  };

  return (
    <div className="space-y-8">
      {!originalFile && (
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedFormats={resizerConfig.acceptedFormats}
          maxSize={resizerConfig.maxFileSize}
          icon="📐"
        />
      )}

      <AnimatePresence mode="wait">
        {originalFile && !resizedFile && (
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
                  <p>📐 {originalDimensions.width} × {originalDimensions.height} px</p>
                </div>
              </div>
            </Card>

            <Card highlight>
              <h3 className="text-xl font-bold text-blue-900 mb-6">Resize Settings</h3>
              
              {/* Custom Dimensions */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    min="1"
                  />
                </div>
              </div>

              {/* Aspect Ratio Toggle */}
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">Maintain aspect ratio</span>
                </label>
              </div>

              {/* Quick Presets */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Presets:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {resizerConfig.presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handlePresetClick(preset.width, preset.height)}
                      className="px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition text-sm border-2 border-blue-200 hover:border-blue-400"
                    >
                      {preset.name}
                      <div className="text-xs text-blue-600 mt-1">
                        {preset.width} × {preset.height}
                      </div>
                    </button>
                  ))}
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
              <ProcessingLoader message="Resizing image..." />
            ) : (
              <>
                <Button onClick={handleResize}>
                  📐 Resize Image
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

        {resizedFile && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-bold text-blue-900 mb-4">Original</h3>
                <img
                  src={originalPreview}
                  alt="Original"
                  className="w-full h-64 object-contain rounded-lg bg-gray-100 mb-4"
                />
                <p className="text-sm text-gray-600 text-center">
                  {originalDimensions.width} × {originalDimensions.height} px
                </p>
              </Card>

              <Card highlight>
                <h3 className="text-lg font-bold text-blue-900 mb-4">Resized</h3>
                <img
                  src={resizedPreview}
                  alt="Resized"
                  className="w-full h-64 object-contain rounded-lg bg-gray-100 mb-4"
                />
                <p className="text-sm text-green-600 text-center font-medium">
                  {width} × {height} px
                </p>
              </Card>
            </div>

            <Button variant="success" onClick={handleDownload}>
              ⬇️ Download Resized Image
            </Button>

            <button
              onClick={reset}
              className="w-full text-gray-500 hover:text-gray-700 text-sm transition"
            >
              ← Resize another image
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
