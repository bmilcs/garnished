import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import * as eventController from "./controllers/eventController";
import * as userController from "./controllers/userController";
import authenticate from "./middlewares/authenticate";

//
// environment variables
//

dotenv.config();
const port = process.env.PORT || 3000;
const productionURL = process.env.PRODUCTION_URL || "";
const corsOrigin =
  process.env.NODE_ENV === "production"
    ? [`https://${productionURL}`, `https://test.${productionURL}`]
    : `https://localhost:3001`;
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

// base route
app.get("/", (req, res) => {
  console.log("received / req");
  res.json("Welcome to Garnished's API!");
});

// user routes
app.get("/user", authenticate, userController.userGet);
app.post("/user", authenticate, userController.userPost);
app.get("/user/auth-status", userController.userAuthStatus);
app.post("/user/login", userController.userLogin);
app.post("/user/signup", userController.userSignup);
app.get("/user/logout", userController.userLogout);

// event routes
app.post("/event", authenticate, eventController.eventCreatePost);
app.get("/event/:id", authenticate, eventController.eventGet);
app.post("/event/:id", authenticate, eventController.eventUpdatePost);

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
