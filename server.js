// Import required modules and files
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import recordsRoutes from './routes/record.js';
import recordsController from './controllers/recordsController.js';
import rbacMiddleware from './middleware/rbacMiddleware.js';
import ROLES  from './config/roles.js';
import { Roles } from './decorators/rolesDecorator.js';
import rolesGuard from './guard/rolesGuard.js';
import corsMiddleware from './middleware/corsMiddleware.js';
import securityMw from './middleware/securityMw.js';
import guardRoute from './routes/guardRoute.js';
import dataRoute from './routes/dataRoute.js';
import errorHandler from './middleware/errorMiddleware.js';
import globalSanitizerPipe from './middleware/sanitizePipe.js';

const app = express();

// Configure middleware
app.use(bodyParser.json());
app.use(corsMiddleware);
app.use(securityMw);
app.use(express.urlencoded({ extended: true }));
app.use(globalSanitizerPipe);

// Define routes
app.use('/auth', authRoutes);
app.use(guardRoute);
app.use('/api', dataRoute);
// app.use('/records', rbacMiddleware.checkRole('user'), recordsRoutes);
app.use((req, res, next) => {
  res.status(404).json({ status: 'fail', message: 'Route not found' });
});
app.use(errorHandler);
// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});