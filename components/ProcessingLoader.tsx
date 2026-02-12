'use client';

import { motion } from 'framer-motion';

interface ProcessingLoaderProps {
  message?: string;
}

export default function ProcessingLoader({ message = 'Processing...' }: ProcessingLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="text-6xl mb-4"
      >
        ⚡
      </motion.div>
      <p className="text-white font-display font-bold text-xl">{message}</p>
    </div>
  );
}
