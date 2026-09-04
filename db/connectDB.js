import mongoose from "mongoose";

const atlasURI = "mongodb+srv://thankgodode535_db_user:DkrAQHwuCqzOJvXa@cluster0.qh0dssv.mongodb.net/?appName=Cluster0"

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