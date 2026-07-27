import multer from 'multer';

// memoryStorage keeps the uploaded file as a Buffer on req.file.buffer.
// Multer never writes anything to disk with this setting.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default upload;