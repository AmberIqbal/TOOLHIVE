import ToolLayout from '@/components/ToolLayout';

export default function PdfCompressorPage() {
  return (
    <ToolLayout
      title="PDF Compressor"
      description="Reduce PDF file size"
      icon="📦"
    >
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
        <p className="text-4xl mb-4">🚧</p>
        <p className="text-xl text-white font-display font-bold mb-2">Coming Very Soon!</p>
        <p className="text-gray-400 font-body">This tool is in development. Check back soon!</p>
      </div>
    </ToolLayout>
  );
}
