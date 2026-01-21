import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const databaseUrl = process.env.DATABASE_URL as string;
    await mongoose.connect(databaseUrl);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  }
};

export default connectDB;