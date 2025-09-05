import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/lib/database/supabase';

import { STORAGE_CONFIG, STORAGE_ERRORS } from './config';

// File validation utilities
export const validateFile = (file: File): { isValid: boolean; error?: string } => {
  // Check file size
  if (file.size > STORAGE_CONFIG.FILE_LIMITS.MAX_SIZE) {
    return { isValid: false, error: STORAGE_ERRORS.FILE_TOO_LARGE };
  }

  // Check file type
  if (
    !STORAGE_CONFIG.FILE_LIMITS.ALLOWED_TYPES.includes(
      file.type as (typeof STORAGE_CONFIG.FILE_LIMITS.ALLOWED_TYPES)[number]
    )
  ) {
    return { isValid: false, error: STORAGE_ERRORS.INVALID_FILE_TYPE };
  }

  return { isValid: true };
};

// Generate secure file path
export const generateSecureFilePath = (userId: string, originalName: string): string => {
  const uniqueId = uuidv4();
  const timestamp = Date.now();
  const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, '_');

  return `${STORAGE_CONFIG.PATHS.USER_CV(userId)}/${timestamp}-${uniqueId}-${sanitizedName}`;
};

// Upload file to storage
export async function uploadFile(
  file: File,
  userId: string
): Promise<{
  success: boolean;
  filePath?: string;
  publicUrl?: string;
  error?: string;
}> {
  try {
    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    // Generate secure file path
    const filePath = generateSecureFilePath(userId, file.name);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(STORAGE_CONFIG.BUCKETS.CV_UPLOADS)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return { success: false, error: STORAGE_ERRORS.UPLOAD_FAILED };
    }

    // Get public URL (for signed URL generation later)
    const { data: urlData } = supabase.storage
      .from(STORAGE_CONFIG.BUCKETS.CV_UPLOADS)
      .getPublicUrl(data.path);

    return {
      success: true,
      filePath: data.path,
      publicUrl: urlData.publicUrl,
    };
  } catch (error) {
    console.error('File upload error:', error);
    return { success: false, error: STORAGE_ERRORS.UPLOAD_FAILED };
  }
}

// Generate signed URL for file access
export async function getSignedUrl(
  filePath: string,
  expiresIn: number = 3600
): Promise<{
  success: boolean;
  signedUrl?: string;
  error?: string;
}> {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_CONFIG.BUCKETS.CV_UPLOADS)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      console.error('Signed URL generation error:', error);
      return { success: false, error: STORAGE_ERRORS.FILE_NOT_FOUND };
    }

    return { success: true, signedUrl: data.signedUrl };
  } catch (error) {
    console.error('Signed URL error:', error);
    return { success: false, error: STORAGE_ERRORS.FILE_NOT_FOUND };
  }
}

// Delete file from storage
export async function deleteFile(filePath: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_CONFIG.BUCKETS.CV_UPLOADS)
      .remove([filePath]);

    if (error) {
      console.error('File deletion error:', error);
      return { success: false, error: STORAGE_ERRORS.FILE_NOT_FOUND };
    }

    return { success: true };
  } catch (error) {
    console.error('File deletion error:', error);
    return { success: false, error: STORAGE_ERRORS.FILE_NOT_FOUND };
  }
}

// List files for a user
export async function listUserFiles(userId: string): Promise<{
  success: boolean;
  files?: Array<{ name: string; size: number; lastModified: string; fullPath: string }>;
  error?: string;
}> {
  try {
    const userPath = STORAGE_CONFIG.PATHS.USER_CV(userId);

    const { data, error } = await supabase.storage
      .from(STORAGE_CONFIG.BUCKETS.CV_UPLOADS)
      .list(userPath);

    if (error) {
      console.error('File listing error:', error);
      return { success: false, error: 'Failed to list files' };
    }

    const files = data.map((file) => ({
      name: file.name,
      size: file.metadata?.size || 0,
      lastModified: file.updated_at,
      fullPath: `${userPath}/${file.name}`,
    }));

    return { success: true, files };
  } catch (error) {
    console.error('File listing error:', error);
    return { success: false, error: 'Failed to list files' };
  }
}

// Get file metadata
export async function getFileMetadata(filePath: string): Promise<{
  success: boolean;
  metadata?: { size: number; type: string; lastModified: string };
  error?: string;
}> {
  try {
    // Extract folder and file name
    const pathParts = filePath.split('/');
    const fileName = pathParts.pop();
    const folderPath = pathParts.join('/');

    const { data, error } = await supabase.storage
      .from(STORAGE_CONFIG.BUCKETS.CV_UPLOADS)
      .list(folderPath);

    if (error) {
      return { success: false, error: STORAGE_ERRORS.FILE_NOT_FOUND };
    }

    const fileInfo = data.find((file) => file.name === fileName);
    if (!fileInfo) {
      return { success: false, error: STORAGE_ERRORS.FILE_NOT_FOUND };
    }

    return {
      success: true,
      metadata: {
        size: fileInfo.metadata?.size || 0,
        type: fileInfo.metadata?.mimetype || 'application/octet-stream',
        lastModified: fileInfo.updated_at,
      },
    };
  } catch (error) {
    console.error('File metadata error:', error);
    return { success: false, error: STORAGE_ERRORS.FILE_NOT_FOUND };
  }
}
