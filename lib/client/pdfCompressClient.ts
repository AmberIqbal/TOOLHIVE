import { PDFDocument } from 'pdf-lib';

export async function compressPdfClient(file: File): Promise<File> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  
  // Save with compression
  const pdfBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });
  
  const compressedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  const fileName = file.name.replace('.pdf', '_compressed.pdf');
  
  return new File([compressedBlob], fileName, { type: 'application/pdf' });
}
