import ToolLayout from '@/components/ToolLayout';

export default function ImageUpscalerPage() {
  return (
    <ToolLayout
      title="Image Upscaler"
      description="AI-powered image enhancement"
      icon="✨"
    >
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
        <p className="text-4xl mb-4">🔑</p>
        <p className="text-xl text-white font-display font-bold mb-2">API Key Required</p>
        <p className="text-gray-400 font-body mb-4">
          This tool requires an AI upscaling API key (Replicate or similar).
        </p>
        <a 
          href="https://replicate.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-display font-bold rounded-lg transition-colors"
        >
          Get API Key →
        </a>
      </div>
    </ToolLayout>
  );
}
