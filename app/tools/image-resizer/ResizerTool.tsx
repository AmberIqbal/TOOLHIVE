'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ImagePreview from '@/components/ImagePreview';
import ProcessingLoader from '@/components/ProcessingLoader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { resizeImageClient } from '@/lib/client/canvasResize';
import { downloadFile } from '@/lib/utils/downloadFile';
import { resizerConfig } from './config';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResizerTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [resizedFile, setResizedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [resizedPreview, setResizedPreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [resizedDimensions, setResizedDimensions] = useState<{ width: number; height: number } | null>(null);

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    setResizedFile(null);
    setResizedDimensions(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalPreview(e.target?.result as string);
      
      // Load image to get dimensions
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleResize = async () => {
    if (!originalFile) return;

    setIsProcessing(true);
    try {
      const result = await resizeImageClient(originalFile, {
        width,
        height,
        maintainAspectRatio,
      });
      
      setResizedFile(result);
      
      // Get actual dimensions of resized image
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        setResizedPreview(preview);
        
        // Load to get actual dimensions
        const img = new Image();
        img.onload = () => {
          setResizedDimensions({ width: img.width, height: img.height });
        };
        img.src = preview;
      };
      reader.readAsDataURL(result);
    } catch (error) {
      console.error('Resize failed:', error);
      alert('Failed to resize image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const applyPreset = (presetWidth: number, presetHeight: number) => {
    setWidth(presetWidth);
    setHeight(presetHeight);
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
              <h3 className="text-white font-display font-bold mb-4">Dimensions</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-400 font-body mb-2">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white font-body"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 font-body mb-2">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white font-body"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-white font-body text-sm mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="w-4 h-4 accent-primary-500"
                />
                Maintain aspect ratio
              </label>

              <div className="space-y-2">
                <p className="text-sm text-gray-400 font-body mb-2">Quick Presets:</p>
                <div className="flex flex-wrap gap-2">
                  {resizerConfig.presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset.width, preset.height)}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/50 rounded-lg text-xs text-white font-body transition-all"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {isProcessing ? (
              <ProcessingLoader message="Resizing..." />
            ) : (
              <>
                <Button onClick={handleResize}>
                  📐 Resize Image
                </Button>
                <button
                  onClick={() => setOriginalFile(null)}
                  className="w-full text-gray-400 hover:text-white font-body text-sm transition-colors"
                >
                  ← Choose a different file
                </button>
              </>
            )}
          </motion.div>
        )}

        {resizedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-display font-bold text-white mb-4">Original</h3>
                <img src={originalPreview} alt="Original" className="w-full h-48 object-contain rounded-lg mb-4" />
                {originalDimensions && (
                  <p className="text-gray-400 font-body text-sm">
                    📐 {originalDimensions.width} × {originalDimensions.height} px
                  </p>
                )}
              </Card>

              <Card highlight>
                <h3 className="text-lg font-display font-bold gradient-text mb-4">Resized</h3>
                <img src={resizedPreview} alt="Resized" className="w-full h-48 object-contain rounded-lg mb-4" />
                {resizedDimensions && (
                  <p className="text-green-400 font-body text-sm font-bold">
                    📐 {resizedDimensions.width} × {resizedDimensions.height} px
                  </p>
                )}
              </Card>
            </div>

            <Button variant="success" onClick={() => resizedFile && downloadFile(resizedFile, `resized_${originalFile!.name}`)}>
              ⬇️ Download Resized Image
            </Button>

            <button
              onClick={() => {
                setOriginalFile(null);
                setResizedFile(null);
                setOriginalDimensions(null);
                setResizedDimensions(null);
              }}
              className="w-full text-gray-400 hover:text-white font-body text-sm transition-colors"
            >
              ← Resize another image
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
