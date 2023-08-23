import * as eventController from "@/controllers/eventController";
import authenticate from "@/middlewares/authenticate";
import express from "express";

//
// event routes
//

const event = express.Router();

event.route("/").post(authenticate, eventController.eventCreatePost);

event
  .route("/:id")
  .get(authenticate, eventController.eventGet)
  .post(authenticate, eventController.eventUpdatePost)
  .delete(authenticate, eventController.eventDelete);

export default event;
