import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()

const atlasURI = process.env.MONGO_DB_URL

// 2. Connect to the database using an async function
async function connectDB() {
    try {
        await mongoose.connect(atlasURI);
        console.log('✅ Successfully connected to MongoDB.');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Stop the app if connection fails
    }
}

export default connectDB