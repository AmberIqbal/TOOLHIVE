import ToolLayout from '@/components/ToolLayout';
import ResizerTool from './ResizerTool';

export default function ImageResizerPage() {
  return (
    <ToolLayout
      title="Image Resizer"
      description="Resize images to any dimension"
      icon="📐"
    >
      <ResizerTool />
    </ToolLayout>
  );
}
