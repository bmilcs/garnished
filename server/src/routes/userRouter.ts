import * as userController from "@/controllers/userController";
import authenticate from "@/middlewares/authenticate";
import express from "express";

//
// user routes
//

const user = express.Router();

user.get("/", authenticate, userController.userGet);
user.get("/auth-status", userController.userAuthStatus);
user.post("/signup", userController.userSignup);
user.post("/login", userController.userLogin);
user.post("/update", authenticate, userController.userPost);
user.get("/logout", authenticate, userController.userLogout);

export default user;
