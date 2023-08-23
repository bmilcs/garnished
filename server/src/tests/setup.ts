import { TEST_ACCESS_TOKEN, TEST_REFRESH_TOKEN } from "@/config/env";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import { test } from "mocha";
import request from "supertest";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

export const AUTH_COOKIES = [
  `accessToken=${TEST_ACCESS_TOKEN}`,
  `refreshToken=${TEST_REFRESH_TOKEN}`,
];

export { app, request, test };
