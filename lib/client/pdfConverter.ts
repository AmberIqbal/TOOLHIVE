import { jsPDF } from 'jspdf';

export async function imageToPdfClient(files: File[]): Promise<File> {
  const pdf = new jsPDF();
  let isFirstPage = true;

  for (const file of files) {
    const img = await loadImage(file);
    
    if (!isFirstPage) {
      pdf.addPage();
    }
    
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate dimensions to fit page while maintaining aspect ratio
    const imgRatio = img.width / img.height;
    const pageRatio = pageWidth / pageHeight;
    
    let finalWidth, finalHeight;
    
    if (imgRatio > pageRatio) {
      finalWidth = pageWidth;
      finalHeight = pageWidth / imgRatio;
    } else {
      finalHeight = pageHeight;
      finalWidth = pageHeight * imgRatio;
    }
    
    const x = (pageWidth - finalWidth) / 2;
    const y = (pageHeight - finalHeight) / 2;
    
    pdf.addImage(img.src, 'JPEG', x, y, finalWidth, finalHeight);
    isFirstPage = false;
  }
  
  const pdfBlob = pdf.output('blob');
  const fileName = files.length === 1 
    ? files[0].name.replace(/\.[^/.]+$/, '.pdf')
    : 'converted.pdf';
  
  return new File([pdfBlob], fileName, { type: 'application/pdf' });
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    reader.onerror = () => reject(new Error('Failed to read file'));
    
    reader.readAsDataURL(file);
  });
}
