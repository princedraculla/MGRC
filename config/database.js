import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URIConnection = process.env.URI;

const db = async () => {
  try {
    await mongoose.connect(URIConnection);
    console.log('database connected');
  } catch (error) {
    console.log(error.message)
  }
};

export default db;
