import express from 'express';
import { getPublicData, getUserDashboard, getAdminPanel } from '../controllers/guardController.js';
const router = express.Router();

router.get('/api/public', getPublicData);
router.get('/api/user/dashboard', getUserDashboard);
router.get('/api/admin/settings', getAdminPanel);

export default router;