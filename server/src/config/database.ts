import {
  DEVELOPMENT_DB,
  MONGO_DB,
  NODE_ENV,
  PRODUCTION_DB,
} from "@/config/env";
import mongoose from "mongoose";

const connectDatabase = async () => {
  const dbName = NODE_ENV === "production" ? PRODUCTION_DB : DEVELOPMENT_DB;
  try {
    await mongoose.connect(MONGO_DB, {
      dbName,
    });
    console.log(`> database connected [${dbName}]`);
  } catch (err) {
    console.error(`> database error: ${err}`);
    throw new Error("failed to connect to database");
  }
};

export default connectDatabase;
