import ToolLayout from '@/components/ToolLayout';

import ConverterTool from './ConverterTool';

export default function FormatConverterPage() {
  return (
    <ToolLayout
      title="Format Converter"
      description="Convert between PNG, JPG and WebP instantly"
      icon="🔄"
    >
      <ConverterTool />
    </ToolLayout>
  );
}

