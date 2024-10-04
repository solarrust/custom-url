import mongoose from "mongoose";

const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  return mongoose.connect(process.env.MONGO_URI as string);
};

export default connectDB;