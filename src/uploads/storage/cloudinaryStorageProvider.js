import streamifier from 'streamifier';
import cloudinary from '../cloudinary.config.js';

/**
 * @param {Buffer} buffer
 * @param {{ folder?: string, resourceType?: string, publicId?: string }} [options]
 */
export function uploadBuffer(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'uploads',
        resource_type: options.resourceType || 'auto',
        public_id: options.publicId,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Cloudinary returned no result'));
        }

        resolve({
          url: result.url,
          secureUrl: result.secure_url,
          publicId: result.public_id,
          format: result.format,
          bytes: result.bytes,
          resourceType: result.resource_type,
          provider: 'cloudinary',
        });
      },
    );

    // The buffer lives in RAM only (Multer's memoryStorage). We pipe it
    // directly into Cloudinary's upload stream — no temp file is ever
    // written to the server's filesystem.
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

export async function deleteFile(publicId, resourceType = 'image') {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}