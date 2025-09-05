// Storage configuration exports
export {
  STORAGE_CONFIG,
  FILE_TYPE_MAP,
  BUCKET_POLICIES,
  STORAGE_ERRORS
} from './config';

// Storage client functions
export {
  validateFile,
  generateSecureFilePath,
  uploadFile,
  getSignedUrl,
  deleteFile,
  listUserFiles,
  getFileMetadata
} from './client';

// Security utilities
export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
};

export const getFileExtension = (fileName: string): string => {
  const lastDot = fileName.lastIndexOf('.');
  return lastDot > 0 ? fileName.substring(lastDot) : '';
};

export const getMimeTypeFromExtension = (extension: string): string => {
  const mimeTypes: { [key: string]: string } = {
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.txt': 'text/plain'
  };
  
  return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
};

// Storage quota utilities
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const calculateStorageUsage = (files: Array<{ size: number }>): {
  totalBytes: number;
  totalFormatted: string;
  filesCount: number;
} => {
  const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
  
  return {
    totalBytes,
    totalFormatted: formatFileSize(totalBytes),
    filesCount: files.length
  };
};