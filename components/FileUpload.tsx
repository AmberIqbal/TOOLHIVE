'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedFormats?: Record<string, string[]>;
  maxSize?: number;
  icon?: string;
  multiple?: boolean;
}

export default function FileUpload({ 
  onFileSelect, 
  acceptedFormats,
  maxSize = 10 * 1024 * 1024,
  icon = '📁',
  multiple = false,
}: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: acceptedFormats,
    maxSize,
    multiple,
  });

  return (
    <div  {...getRootProps()} className="w-full">
      <motion.div
       
        whileHover={{ scale: 1.01 }}
         onAnimationStart={() => {}}
  onAnimationComplete={() => {}}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center 
          cursor-pointer transition-all duration-300
          ${isDragActive 
            ? 'border-primary-500 bg-primary-500/10' 
            : 'border-white/20 bg-white/5 hover:border-primary-500/50 hover:bg-white/10'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <motion.div
          animate={{ y: isDragActive ? -10 : 0 }}
          className="text-6xl mb-4"
        >
          {icon}
        </motion.div>
        
        <h3 className="text-2xl font-display font-bold text-white mb-2">
          {isDragActive ? 'Drop it here!' : 'Drop your file here'}
        </h3>
        
        <p className="text-gray-400 font-body mb-4">
          or click to browse from your computer
        </p>

        <div className="text-sm text-gray-500 font-body">
          Max file size: {(maxSize / (1024 * 1024)).toFixed(0)}MB
        </div>

        {fileRejections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
             onAnimationStart={() => {}}
  onAnimationComplete={() => {}}
            className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
          >
            {fileRejections[0].errors[0].message}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
