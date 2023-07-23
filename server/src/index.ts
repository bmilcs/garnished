import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import * as eventController from "./controllers/eventController";
import * as userController from "./controllers/userController";

//
// environment variables
//

dotenv.config();
const port = process.env.PORT || 3000;
const corsOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_URL
    : `http://localhost:3001`;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

//
// express app
//

const app = express();

//
// cors: cross origin resource sharing
//

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

const mongoDB = process.env.MONGODB || "";
async function connectDB() {
  try {
    await mongoose.connect(mongoDB);
    console.log("database connected");
  } catch (err) {
    console.error("error connecting to mongodb:", err);
  }
}

//
// authentication
//

// cookie parser middleware: used for jwt tokens
app.use(cookieParser());

//
// routes
//

// user routes
app.get("/api/user", userController.userGet);
app.post("/api/user", userController.userPost);
app.post("/api/user/login", userController.userLogin);
app.post("/api/user/signup", userController.userSignup);
app.get("/api/user/logout", userController.userLogout);

// event routes
app.get("/api/event/:id", eventController.eventGet);
app.post("/api/event/:id", eventController.eventPost);

//
// start server
//

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server started on port: ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
