import { MONGO_DB } from "@/config/env";
import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_DB);
    console.log("database connected");
  } catch (err) {
    console.error("mongodb error:", err);
    throw new Error("failed to connect to database");
  }
};

export default connectDatabase;
