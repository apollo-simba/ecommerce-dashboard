import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URL as string);
            // await mongoose.connect("mongodb://localhost:27017/test");
            console.log("Database connected");
        }
    } catch (error) {
        console.error("Database connection error:", error);
        throw error; // Re-throw the error to allow upstream handling
    }
};

export default connectDB;