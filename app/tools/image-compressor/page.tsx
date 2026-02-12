import ToolLayout from '@/components/ToolLayout';
import CompressorTool from './CompressorTool';

export default function ImageCompressorPage() {
  return (
    <ToolLayout
      title="Image Compressor"
      description="Reduce file size without losing quality"
      icon="⚡"
    >
      <CompressorTool />
    </ToolLayout>
  );
}
