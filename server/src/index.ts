import express, { Request, Response } from "express";
import mongoose from "mongoose";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// database connection
const mongoDB = process.env.MONGODB || "";
async function connectDB() {
  await mongoose.connect(mongoDB);
  console.log("database connected");
}

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("index says hello world!!");
});

// start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server started on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
