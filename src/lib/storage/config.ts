// Storage configuration constants
export const STORAGE_CONFIG = {
  BUCKETS: {
    CV_UPLOADS: 'cv-uploads',
  },
  FILE_LIMITS: {
    MAX_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ],
    ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx', '.txt'],
  },
  PATHS: {
    USER_CV: (userId: string) => `users/${userId}/cvs`,
    TEMP_UPLOADS: 'temp',
  },
} as const;

// File type validation mapping
export const FILE_TYPE_MAP = {
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'text/plain': '.txt',
} as const;

// Storage bucket policies (to be applied in Supabase)
export const BUCKET_POLICIES = {
  CV_UPLOADS: {
    name: 'cv-uploads',
    public: false,
    allowedMimeTypes: STORAGE_CONFIG.FILE_LIMITS.ALLOWED_TYPES,
    fileSizeLimit: STORAGE_CONFIG.FILE_LIMITS.MAX_SIZE,
    policies: [
      {
        name: 'Users can upload their own CVs',
        definition: 'auth.uid() = (storage.foldername(name))[1]::uuid',
        operation: 'INSERT',
      },
      {
        name: 'Users can view their own CVs',
        definition: 'auth.uid() = (storage.foldername(name))[1]::uuid',
        operation: 'SELECT',
      },
      {
        name: 'Users can update their own CVs',
        definition: 'auth.uid() = (storage.foldername(name))[1]::uuid',
        operation: 'UPDATE',
      },
      {
        name: 'Users can delete their own CVs',
        definition: 'auth.uid() = (storage.foldername(name))[1]::uuid',
        operation: 'DELETE',
      },
      {
        name: 'Admins can access all CVs',
        definition: "auth.jwt() ->> 'role' = 'admin'",
        operation: 'ALL',
      },
    ],
  },
} as const;

// Error messages
export const STORAGE_ERRORS = {
  FILE_TOO_LARGE: 'File size exceeds the maximum limit of 10MB',
  INVALID_FILE_TYPE: 'File type not supported. Please upload PDF, DOC, DOCX, or TXT files',
  UPLOAD_FAILED: 'File upload failed. Please try again',
  UNAUTHORIZED: 'You are not authorized to perform this operation',
  FILE_NOT_FOUND: 'File not found',
  QUOTA_EXCEEDED: 'Storage quota exceeded',
} as const;
