import express from 'express';
import getProtectedData from '../controllers/dataController.js';
const router = express.Router();

router.get('/data', getProtectedData);

export default router;