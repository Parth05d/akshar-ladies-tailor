import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URL;
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection to Database Failed", error.message);
  }
};

export default connectDb;
