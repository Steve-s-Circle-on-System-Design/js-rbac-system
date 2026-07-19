// Import required modules and files
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import recordsRoutes from './routes/record.js';
import authController from './controllers/authController.js';
import recordsController from './controllers/recordsController.js';
import rbacMiddleware from './middleware/rbacMiddleware.js';

const app = express();

// Configure middleware
app.use(bodyParser.json());

// Define routes
app.use('/auth', authRoutes);
app.use('/records', rbacMiddleware.checkRole('user'), recordsRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});