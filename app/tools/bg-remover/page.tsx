import ToolLayout from '@/components/ToolLayout';
import BgRemoverTool from './BgRemoverTool';

export default function BgRemoverPage() {
  return (
    <ToolLayout
      title="Background Remover"
      description="AI-powered background removal"
      icon="🎨"
    >
      <BgRemoverTool />
    </ToolLayout>
  );
}

