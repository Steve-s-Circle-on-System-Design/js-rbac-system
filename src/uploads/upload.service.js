import * as storageProvider from './storage/cloudinaryStorageProvider.js';

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

function badRequest(message) {
  const err = new Error(message);
  err.statusCode = 400;
  return err;
}

export async function uploadFile(file, folder) {
  if (!file) {
    throw badRequest('No file provided');
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw badRequest(
      `Unsupported file type "${file.mimetype}". Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`,
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw badRequest('File exceeds the 5MB size limit');
  }

  const result = await storageProvider.uploadBuffer(file.buffer, {
    folder: folder || 'uploads',
    resourceType: 'image',
  });

  return {
    url: result.secureUrl,
    publicId: result.publicId,
    format: result.format,
    bytes: result.bytes,
    resourceType: result.resourceType,
  };
}

export async function deleteFile(publicId) {
  await storageProvider.deleteFile(publicId);
}