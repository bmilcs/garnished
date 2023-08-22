import {
  CLIENT_PORT,
  MONGO_DB,
  NODE_ENV,
  PRODUCTION_URL,
  SERVER_PORT,
} from "@/config";
import * as contactController from "@/controllers/contactController";
import * as eventController from "@/controllers/eventController";
import * as userController from "@/controllers/userController";
import authenticate from "@/middlewares/authenticate";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

//
// create express app
//

const app = express();

//
// cors: cross origin resource sharing
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
// body parser middleware
//

// parse incoming data to req.body
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded: easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({ extended: true }));

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
// authentication
//

// cookie parser middleware: used for jwt tokens
app.use(cookieParser());

//
// routes
//

// base route
app.get("/", (req, res) => {
  res.json("Welcome to Garnished's API!");
});

// user routes
app.get("/user", authenticate, userController.userGet);
app.get("/user/auth-status", userController.userAuthStatus);
app.post("/user/signup", userController.userSignup);
app.post("/user/login", userController.userLogin);
app.post("/user/update", authenticate, userController.userPost);
app.get("/user/logout", userController.userLogout);

// event routes
app.post("/event", authenticate, eventController.eventCreatePost);
app.get("/event/:id", authenticate, eventController.eventGet);
app.post("/event/:id", authenticate, eventController.eventUpdatePost);
app.delete("/event/:id", authenticate, eventController.eventDelete);

// contact form route
app.post("/contact", contactController.contactPost);

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
