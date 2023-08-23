import * as contactController from "@/controllers/contactController";
import express from "express";

//
// contact form route
//

const contact = express.Router();

contact.post("/", contactController.contactPost);

export default contact;
