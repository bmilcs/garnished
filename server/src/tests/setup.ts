import { TEST_ACCESS_TOKEN, TEST_REFRESH_TOKEN } from "@/config/env";
import EventModel from "@/models/event";
import UserModel from "@/models/user";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import { test } from "mocha";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

//
// server
//

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

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

  mongoose.connection.once("open", () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
};

const teardownMongoTestServer = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

//
// json web tokens
//

export const AUTH_COOKIES = [
  `accessToken=${TEST_ACCESS_TOKEN}`,
  `refreshToken=${TEST_REFRESH_TOKEN}`,
];

export { app, request, setupMongoTestServer, teardownMongoTestServer, test };
