'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ProcessingLoader from '@/components/ProcessingLoader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { convertFormatClient } from '@/lib/client/formatConverter';
import { downloadFile } from '@/lib/utils/downloadFile';
import { formatFileSize } from '@/lib/utils/formatFileSize';
import { converterConfig } from './config';
import { motion, AnimatePresence } from 'framer-motion';

type OutputFormat = 'png' | 'jpg' | 'webp';

export default function ConverterTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [convertedPreview, setConvertedPreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('png');
  const [quality, setQuality] = useState(95);

  const handleFileSelect = (file: File) => {
    setOriginalFile(file);
    setConvertedFile(null);

    const reader = new FileReader();
    reader.onload = (e) => setOriginalPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // Auto-suggest a different format than the input
    const inputFormat = file.type.split('/')[1];
    if (inputFormat === 'png') setOutputFormat('jpg');
    else if (inputFormat === 'jpeg' || inputFormat === 'jpg') setOutputFormat('webp');
    else setOutputFormat('png');
  };

  const handleConvert = async () => {
    if (!originalFile) return;
    setIsProcessing(true);

    try {
      const result = await convertFormatClient(originalFile, {
        format: outputFormat,
        quality: quality / 100,
      });

      setConvertedFile(result);

      const reader = new FileReader();
      reader.onload = (e) => setConvertedPreview(e.target?.result as string);
      reader.readAsDataURL(result);
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to convert image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (convertedFile) downloadFile(convertedFile);
  };

  const reset = () => {
    setOriginalFile(null);
    setConvertedFile(null);
    setOriginalPreview('');
    setConvertedPreview('');
  };

  const getFormatColor = (format: string) => {
    if (format === 'png') return 'from-blue-500 to-indigo-500';
    if (format === 'jpg' || format === 'jpeg') return 'from-orange-500 to-yellow-500';
    return 'from-green-500 to-teal-500';
  };

  const getInputFormat = () => {
    if (!originalFile) return '';
    const mime = originalFile.type.split('/')[1];
    return mime === 'jpeg' ? 'jpg' : mime;
  };

  return (
    <div className="space-y-8">
      {!originalFile && (
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedFormats={converterConfig.acceptedFormats}
          maxSize={converterConfig.maxFileSize}
          icon="🔄"
        />
      )}

      <AnimatePresence mode="wait">
        {originalFile && !convertedFile && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Original preview */}
            <Card>
              <h3 className="text-white font-display font-bold mb-4">Original Image</h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                  src={originalPreview}
                  alt="Original"
                  className="max-w-xs max-h-56 rounded-lg object-contain"
                />
                <div className="space-y-2 text-gray-400 font-body text-sm">
                  <p>📁 {originalFile.name}</p>
                  <p>📊 {formatFileSize(originalFile.size)}</p>
                  <p className="flex items-center gap-2">
                    🏷️ Current format:
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-bold text-white uppercase
                      bg-gradient-to-r ${getFormatColor(getInputFormat())}
                    `}>
                      {getInputFormat()}
                    </span>
                  </p>
                </div>
              </div>
            </Card>

            {/* Format selection */}
            <Card>
              <h3 className="text-white font-display font-bold mb-6">Convert To:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {converterConfig.outputFormats.map((fmt) => (
                  <motion.button
                    key={fmt.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOutputFormat(fmt.value as OutputFormat)}
                    disabled={getInputFormat() === fmt.value}
                    className={`
                      relative p-4 rounded-xl border-2 text-left transition-all duration-200
                      disabled:opacity-30 disabled:cursor-not-allowed
                      ${outputFormat === fmt.value
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-white/10 bg-white/5 hover:border-white/30'
                      }
                    `}
                  >
                    {outputFormat === fmt.value && (
                      <span className="absolute top-3 right-3 text-primary-400 text-lg">✓</span>
                    )}
                    <span className={`
                      inline-block px-3 py-1 rounded-full text-xs font-bold text-white uppercase mb-2
                      bg-gradient-to-r ${getFormatColor(fmt.value)}
                    `}>
                      {fmt.label}
                    </span>
                    <p className="text-gray-400 font-body text-xs leading-relaxed">
                      {fmt.description}
                    </p>
                    {getInputFormat() === fmt.value && (
                      <p className="text-yellow-400 font-body text-xs mt-1">Current format</p>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Quality slider (for JPG/WebP) */}
              {(outputFormat === 'jpg' || outputFormat === 'webp') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label className="block text-white font-display font-bold mb-3">
                    Quality: {quality}%
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
                </motion.div>
              )}
            </Card>

            {/* Convert arrow indicator */}
            <div className="flex items-center justify-center gap-4 font-display font-bold text-lg">
              <span className={`
                px-4 py-2 rounded-full text-white uppercase
                bg-gradient-to-r ${getFormatColor(getInputFormat())}
              `}>
                {getInputFormat()}
              </span>
              <span className="text-2xl text-gray-400 animate-pulse">→</span>
              <span className={`
                px-4 py-2 rounded-full text-white uppercase
                bg-gradient-to-r ${getFormatColor(outputFormat)}
              `}>
                {outputFormat}
              </span>
            </div>

            {isProcessing ? (
              <ProcessingLoader message="Converting..." />
            ) : (
              <>
                <Button onClick={handleConvert}>
                  🔄 Convert to {outputFormat.toUpperCase()}
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

        {/* Result */}
        {convertedFile && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-display font-bold text-white mb-3">Original</h3>
                <img
                  src={originalPreview}
                  alt="Original"
                  className="w-full h-48 object-contain rounded-lg mb-3"
                />
                <div className="flex items-center gap-2 font-body text-sm">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-bold text-white uppercase
                    bg-gradient-to-r ${getFormatColor(getInputFormat())}
                  `}>
                    {getInputFormat()}
                  </span>
                  <span className="text-gray-400">{formatFileSize(originalFile!.size)}</span>
                </div>
              </Card>

              <Card highlight>
                <h3 className="text-lg font-display font-bold gradient-text mb-3">Converted</h3>
                <img
                  src={convertedPreview}
                  alt="Converted"
                  className="w-full h-48 object-contain rounded-lg mb-3"
                />
                <div className="flex items-center gap-2 font-body text-sm">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-bold text-white uppercase
                    bg-gradient-to-r ${getFormatColor(outputFormat)}
                  `}>
                    {outputFormat}
                  </span>
                  <span className="text-green-400">{formatFileSize(convertedFile.size)}</span>
                </div>
              </Card>
            </div>

            <Button variant="success" onClick={handleDownload}>
              ⬇️ Download as {outputFormat.toUpperCase()}
            </Button>

            <button
              onClick={reset}
              className="w-full text-gray-400 hover:text-white font-body text-sm transition-colors"
            >
              ← Convert another image
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
