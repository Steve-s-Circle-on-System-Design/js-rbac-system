import express from 'express';
import rbacMiddleware from '../middleware/rbacMiddleware.js';
import recordsController from '../controllers/recordsController.js';

const router = express.Router();

// Protect the routes with RBAC middleware
router.get('/records', rbacMiddleware.checkPermission('read_record'), recordsController.getAllRecord);
router.post('/records', rbacMiddleware.checkPermission('create_record'), recordsController.createRecord);
router.put('/records/:id', rbacMiddleware.checkPermission('update_record'), recordsController.updateRecord);
router.delete('/records/:id', rbacMiddleware.checkPermission('delete_record'), recordsController.deleteRecord);

export default router;