import corsOptions from "@/config/cors";
import connectDatabase from "@/config/database";
import { SERVER_PORT } from "@/config/env";
import errorHandler from "@/middlewares/errorHandler";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import contactRouter from "./routes/contactRouter";
import eventRouter from "./routes/eventRouter";
import userRouter from "./routes/userRouter";

//
// create an express app
//

const app = express();

//
// middleware
//

// compress responses
app.use(compression());

// cors: allow requests from the client
app.use(cors(corsOptions));

// parse incoming data to req.body
app.use(bodyParser.json());

// parse cookies: authentication jwt tokens are stored in cookies
app.use(cookieParser());

// helmet: set security headers & protect well-known web vulnerabilities
app.use(helmet());

//
// routes
//

app.use("/contact", contactRouter);
app.use("/event", eventRouter);
app.use("/user", userRouter);

//
// error handling
//

app.use(errorHandler);

//
// start server
//

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(SERVER_PORT, () => {
      console.log(`> server started on port: ${SERVER_PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
