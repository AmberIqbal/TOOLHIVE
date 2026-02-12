'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ToolLayoutProps {
  title: string;
  description: string;
  icon: string;
  children: ReactNode;
}

export default function ToolLayout({ title, description, icon, children }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="noise-overlay absolute inset-0" />

      <div className="container mx-auto px-6 py-8 relative z-10 max-w-5xl">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-body text-sm group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Tools
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="text-7xl mb-4 animate-float">
            {icon}
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black gradient-text mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-400 font-body max-w-2xl mx-auto">
            {description}
          </p>
        </motion.header>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
