import {
  CLIENT_PORT,
  MONGO_DB,
  NODE_ENV,
  PRODUCTION_URL,
  SERVER_PORT,
} from "@/config/env";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import contactRouter from "./routes/contactRouter";
import eventRouter from "./routes/eventRouter";
import userRouter from "./routes/userRouter";

//
// create an express app
//

const app = express();

//
// setup cors: cross origin resource sharing
//

const corsOrigin =
  NODE_ENV === "production"
    ? [`https://${PRODUCTION_URL}`, `https://test.${PRODUCTION_URL}`]
    : `http://localhost:${CLIENT_PORT}`;

const corsOptions = {
  origin: corsOrigin,
  optionsSuccessStatus: 200,
  credentials: true, // allow cookies to be sent from the client to the server
};

app.use(cors(corsOptions));

//
// middleware
//

// parse incoming data to req.body
app.use(bodyParser.json());

// parse cookies: authentication jwt tokens are stored in cookies
app.use(cookieParser());

//
// database connection
//

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_DB);
    console.log("database connected");
  } catch (err) {
    console.error("mongodb error:", err);
    throw new Error("failed to connect to database");
  }
};

//
// routes
//

app.use("/contact", contactRouter);
app.use("/event", eventRouter);
app.use("/user", userRouter);

//
// start server
//

const startServer = async () => {
  try {
    await connectDB();
    app.listen(SERVER_PORT, () => {
      console.log(`server started on port: ${SERVER_PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
