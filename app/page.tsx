'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TOOLS } from '@/constants/toolConfig';

export default function Home() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleToolClick = (toolId: string, available: boolean) => {
    if (available) {
      router.push(`/tools/${toolId}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="noise-overlay absolute inset-0" />

      <div className="container mx-auto px-6 py-12 relative z-10 max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h1
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-7xl md:text-8xl font-display font-black mb-4 gradient-text"
          >
            🐝 ToolHive
          </motion.h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-body max-w-3xl mx-auto mb-8">
            [ all-in-one creative tools for digital creators ]
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <div className="px-6 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-300 font-body text-sm">
              ⚡ Lightning Fast
            </div>
            <div className="px-6 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full text-pink-300 font-body text-sm">
              🎯 Privacy First
            </div>
            <div className="px-6 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 font-body text-sm">
              🚀 No Sign-up
            </div>
          </div>
        </motion.header>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {TOOLS.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onHoverStart={() => setHoveredCard(tool.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => handleToolClick(tool.id, tool.available)}
              className={`
                group relative overflow-hidden rounded-2xl p-8 cursor-pointer 
                transition-all duration-300
                ${tool.available 
                  ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20' 
                  : 'bg-white/5 border border-white/5 opacity-60 cursor-not-allowed'
                }
              `}
            >
              {/* Gradient overlay */}
              {tool.available && (
                <motion.div
                  initial={false}
                  animate={{ opacity: hoveredCard === tool.id ? 0.1 : 0 }}
                  className={`absolute inset-0 bg-gradient-to-br ${tool.gradient}`}
                />
              )}

              <div className="relative z-10">
                <div className="text-6xl mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
                  {tool.icon}
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-3 text-white">
                  {tool.name}
                </h3>
                
                <p className="text-gray-400 font-body text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>

                <span className={`
                  inline-block px-4 py-1.5 rounded-full text-xs font-bold
                  ${tool.badge === 'AI Powered' 
                    ? 'bg-gradient-to-r from-primary-500 to-pink-500 text-white'
                    : tool.badge === 'Coming Soon'
                    ? 'bg-gray-600 text-gray-300'
                    : 'bg-green-500/20 text-green-300 border border-green-500/30'
                  }
                `}>
                  {tool.badge}
                </span>

                {tool.available && (
                  <motion.div
                    animate={{ x: hoveredCard === tool.id ? 5 : 0 }}
                    className="absolute top-8 right-8 text-white/40 group-hover:text-white/80"
                  >
                    →
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 font-body text-sm pt-12 border-t border-white/5"
        >
          <p className="mb-4">ToolHive © 2026 | Making creativity effortless, one tool at a time 🐝</p>
          <div className="flex gap-6 justify-center text-xs">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-primary-400 transition-colors">GitHub</a>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}
