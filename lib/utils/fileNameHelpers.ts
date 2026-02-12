export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.substring(lastDot) : '';
}

export function getFileNameWithoutExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.substring(0, lastDot) : filename;
}

export function createOutputFilename(
  originalName: string,
  operation: string,
  newExtension?: string
): string {
  const nameWithoutExt = getFileNameWithoutExtension(originalName);
  const ext = newExtension || getFileExtension(originalName);
  return `${nameWithoutExt}_${operation}${ext}`;
}
