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
  maxSize = 20 * 1024 * 1024,
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
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-16 text-center 
          cursor-pointer transition-all duration-300 bg-white
          hover:scale-[1.01]
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 shadow-lg' 
            : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50/50 shadow-md'
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
        
        <h3 className="text-2xl font-bold text-blue-900 mb-2">
          {isDragActive ? 'Drop it here!' : 'Drop your file here'}
        </h3>
        
        <p className="text-gray-600 mb-4">
          or click to browse from your computer
        </p>

        <div className="text-sm text-gray-500">
          Max file size: {(maxSize / (1024 * 1024)).toFixed(0)}MB
        </div>

        {fileRejections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium"
          >
            {fileRejections[0].errors[0].message}
          </motion.div>
        )}
      </div>
    </div>
  );
}
