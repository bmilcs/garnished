import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
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
};
app.use(cors(corsOptions));

//
// body parser middleware: parse incoming data
//

app.use(bodyParser.json());
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

// passport middleware
app.use(passport.initialize());

//
// routes
//

// user routes
app.get("/api/user", userController.userGet);
app.post("/api/user", userController.userPost);
app.post("/api/user/login", userController.userLogin);
app.post("/api/user/signup", userController.userSignup);
app.post("/api/user/logout", userController.userLogout);

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
