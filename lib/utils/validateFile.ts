export function validateFile(
  file: File,
  acceptedTypes: string[],
  maxSize: number
): { valid: boolean; error?: string } {
  // Check file type
  if (!acceptedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not supported. Please use: ${acceptedTypes.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `File size exceeds ${maxSizeMB}MB limit`,
    };
  }

  return { valid: true };
}
