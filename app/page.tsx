'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
export default function Home() {
  const router = useRouter();
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'image-compressor',
      name: 'Image Compressor',
      description: 'Reduce file size without losing quality',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'image-resizer',
      name: 'Image Resizer',
      description: 'Resize to any dimension with presets',
      color: 'from-blue-600 to-indigo-500',
    },
    {
      id: 'format-converter',
      name: 'Format Converter',
      description: 'Convert PNG, JPG, WebP instantly',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl"></span>
            <span className="text-2xl font-bold text-blue-900">ImgToolSet</span>
          </div>
          <div className="hidden md:flex gap-8 text-gray-600 font-medium">
            <a href="#tools" className="hover:text-blue-600 transition">Tools</a>
            <a href="#features" className="hover:text-blue-600 transition">Features</a>
            
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-black text-blue-900 mb-6 leading-tight">
              Remove Backgrounds
              <span className="block text-blue-600">Instantly with AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Fast, powerful, and easy to use. Transform your images in seconds with AI-powered tools.
            </p>
            <div className="flex gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/tools/bg-remover')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition"
              >
                Try Background Remover →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                 onClick={() => {
                  const toolsSection = document.getElementById('tools');
                  toolsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition"
              >
                View All Tools
              </motion.button>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <span>Lightning Fast</span>
              <span>100% Private</span>
              <span>No Sign-up</span>
            </div>
          </motion.div>

          {/* Right: Demo Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-600 font-medium text-lg mb-2">AI Background Removal</p>
                  <p className="text-sm text-gray-500">Upload → Process → Download</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Tool - Background Remover */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 mt-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              AI Background Remover
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Remove backgrounds from any image in seconds. 
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { text: 'Supports up to 20MB' },
              { text: 'PNG, JPG, WebP' },
              { text: 'Instant results' },
              { text: 'No watermarks' },
              { text: 'High quality output' },
              { text: 'Privacy first' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <p className="text-white font-medium">{feature.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/tools/bg-remover')}
              className="px-12 py-5 bg-white text-blue-600 font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transition"
            >
              Remove Background Now →
            </motion.button>
          </div>
        </div>
      </section>

      {/* Other Tools Section */}
      <section id="tools" className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-4">
            More Powerful Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to edit and optimize your images
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredTool(tool.id)}
              onHoverEnd={() => setHoveredTool(null)}
              onClick={() => router.push(`/tools/${tool.id}`)}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-200"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-3">{tool.name}</h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <motion.div
                animate={{ x: hoveredTool === tool.id ? 5 : 0 }}
                className="text-blue-600 font-bold"
              >
                Try it now →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-blue-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to amazing results</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { title: 'Upload Your Image', desc: 'Drag and drop or click to browse' },
              { title: 'AI Processes', desc: 'Our AI analyzes and transforms' },
              { title: 'Download Result', desc: 'Get your processed image instantly' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-3xl font-black text-white mx-auto mb-6 shadow-lg">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'Lightning Fast', desc: 'Process images in seconds' },
            { title: 'Privacy First', desc: 'All processing on secure servers' },
            { title: '100% Free Tools', desc: 'No hidden costs' },
            { title: 'No Sign-up', desc: 'Start using immediately' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md text-center"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Start Creating Amazing Visuals Today
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands using ImgToolSet to transform their images
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/tools/bg-remover')}
              className="px-12 py-5 bg-white text-blue-600 font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transition"
            >
              Try Background Remover Now →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl"></span>
              <span className="text-white font-bold">ImgToolSet</span>
              <span className="text-sm">© 2026</span>
            </div>
            <div className="flex gap-8 text-sm">
               <Link href="/Privacy" className="hover:text-white transition">Privacy</Link>
  
              <Link href="/Terms" className="hover:text-white transition">Terms</Link>
              
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
