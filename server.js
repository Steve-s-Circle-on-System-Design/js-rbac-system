// Import required modules and files
import dotenv from "dotenv"
import express from 'express';
import cookieParser from "cookie-parser"
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import recordsRoutes from './routes/record.js';
import recordsController from './controllers/recordsController.js';
import rbacMiddleware from './middleware/rbacMiddleware.js';
import connectDB from './db/connectDB.js';
import { authMiddleware } from "./middleware/authMiddleware.js";
import refresh from "./routes/refresh.js";

dotenv.config();

const app = express();

// Configure middleware
app.use(bodyParser.json());
app.use(cookieParser())

// Define routes
app.use('/auth', authRoutes);
app.use(refresh)
app.use('/', authMiddleware, recordsRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async() => {
  console.log("Connecting to database...")
  try {
    await connectDB()
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log("Error: ", error)
  }
});