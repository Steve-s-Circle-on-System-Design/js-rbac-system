import * as uploadService from './upload.service.js';

export async function handleUpload(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded. Attach a file under the "file" field.',
      });
    }

    const result = await uploadService.uploadFile(req.file, req.body.folder);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function handleDelete(req, res, next) {
  try {
    await uploadService.deleteFile(req.params.publicId);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    next(err);
  }
}