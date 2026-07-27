import express from 'express';
import upload from './multer.config.js';
import * as controller from './upload.controller.js';

const router = express.Router();

router.post('/', upload.single('file'), controller.handleUpload);
router.delete('/:publicId', controller.handleDelete);

export default router;