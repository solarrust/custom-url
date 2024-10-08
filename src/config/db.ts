import mongoose from "mongoose";

const connectDB = async () => {
  return mongoose.connect(process.env.MONGODB_URI as string);
};

export default connectDB;