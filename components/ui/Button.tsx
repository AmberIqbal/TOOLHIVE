'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'success';
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  disabled, 
  variant = 'primary',
  className = '' 
}: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-pink-500 hover:shadow-primary-500/50',
    secondary: 'bg-white/10 hover:bg-white/20 border border-white/20',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-green-500/50',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 px-8 rounded-xl font-display font-bold text-lg text-white
        transition-all duration-300 hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
