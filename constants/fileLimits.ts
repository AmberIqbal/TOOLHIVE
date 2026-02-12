export const FILE_LIMITS = {
  // Image processing limits
  image: {
    CLIENT_MAX: 10 * 1024 * 1024, // 10MB - client-side limit
    SERVER_MAX: 50 * 1024 * 1024, // 50MB - server-side limit
  },
  
  // PDF processing limits
  pdf: {
    CLIENT_MAX: 5 * 1024 * 1024,  // 5MB - small PDFs on client
    SERVER_MAX: 50 * 1024 * 1024, // 50MB - large PDFs on server
    CLIENT_MAX_PAGES: 1,          // Single page on client
    SERVER_MAX_PAGES: 100,        // Multi-page on server
  },
};

export const COMPRESSION_QUALITY = {
  LOW: 0.6,
  MEDIUM: 0.8,
  HIGH: 0.9,
  MAX: 1.0,
};
