import errorHandler from "@/middlewares/errorHandler";
import EventModel from "@/models/event";
import UserModel, { TUserRequestDetails } from "@/models/user";
import contactRouter from "@/routes/contactRouter";
import eventRouter from "@/routes/eventRouter";
import userRouter from "@/routes/userRouter";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
export { FAILED_LOGIN_ATTEMPTS_LIMIT } from "@/config/env";

//
// server
//

const app = express();
app.set("testMode", true);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use("/user", userRouter);
app.use("/event", eventRouter);
app.use("/contact", contactRouter);
app.use(errorHandler);

//
// database connection
//

let mongoServer: MongoMemoryServer;

const mongodbMemoryServerOptions = {
  binary: {
    version: "6.0.6",
    skipMD5: true,
  },
  autoStart: false,
  instance: {},
};

const setupMongoTestServer = async () => {
  mongoServer = await MongoMemoryServer.create(mongodbMemoryServerOptions);
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // register schemas
  mongoose.model("User", UserModel.schema);
  mongoose.model("Event", EventModel.schema);

  mongoose.connection.on("error ", e => {
    if (e.message.code === "ETIMEDOUT") {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });
};

const teardownMongoTestServer = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

beforeEach(async () => await setupMongoTestServer());
afterEach(async () => await teardownMongoTestServer());

//
// helper functions
//

const signupUser = async (
  app: Express.Application,
  newUser: TUserRequestDetails,
) => {
  const res = await request(app).post("/user/signup").send(newUser).expect(200);
  const cookies = res.header["set-cookie"];
  return cookies;
};

const loginUser = async (
  app: Express.Application,
  credentials: { username: string; password: string },
) => {
  const res = await request(app)
    .post("/user/login")
    .send(credentials)
    .expect(200);
  const cookies = res.header["set-cookie"];
  return cookies;
};

const logoutUser = async (app: Express.Application, cookies: string[]) => {
  const res = await request(app)
    .delete("/user/logout")
    .set("Cookie", cookies)
    .expect(200);
};

const createEvent = async (
  app: Express.Application,
  cookies: string[],
  event: object,
) => {
  const res = await request(app)
    .post("/event")
    .set("Cookie", cookies)
    .send(event)
    .expect(200);
  return res.body.eventId;
};

//
// mock data
//

const userData = {
  firstName: "John",
  lastName: "Doe",
  username: "test@garnished.com",
  password: "password123",
  address: "123 Main St",
  city: "Exampleville",
  state: "CA",
  zip: "12345",
  phone: "123-456-7890",
};

const eventData = {
  date: "2024-08-16",
  time: "17:00",
  locationDescription: "Around back",
  address: "123 Circle Dr.",
  city: "West Springfield",
  state: "MA",
  zip: "01089",
  guests: "25",
  hours: "4",
  eventType: "Birthday",
  needBar: "true",
  needTent: "false",
  needAlcohol: "true",
  needDrinkware: "true",
  beer: "true",
  wine: "true",
  specialtyDrinks: "false",
  liquorPreferences: "11",
};

export {
  app,
  createEvent,
  eventData,
  loginUser,
  logoutUser,
  request,
  setupMongoTestServer,
  signupUser,
  teardownMongoTestServer,
  userData,
};
