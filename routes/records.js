import express from express
import rbacMiddleware from '../middleware/rbacMiddleware'
import recordsController from '../controllers/recordsController'

const router = express.Router();

// Protect the route with RBAC middleware
router.get('/records', rbacMiddleware.checkPermission('read_record'), recordsController.getAllRecords);

export default router;