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
  .patch(authenticate, eventController.eventUpdatePatch)
  .delete(authenticate, eventController.eventDelete);

export default event;
