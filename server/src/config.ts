import dotenv from "dotenv";

dotenv.config();

// node environment
export const NODE_ENV = process.env.NODE_ENV || "development";

// ports for client/server
export const SERVER_PORT = process.env.SERVER_PORT || 3001;
export const CLIENT_PORT = process.env.CLIENT_PORT || 3000;

// database connection string: mongodb atlas
export const MONGO_DB = process.env.MONGODB || "";

// production url: required for CORS
export const PRODUCTION_URL = process.env.PRODUCTION_URL || "";

// jwt token secrets
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";

// nodemailer email credentials
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME || "";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";

// nodemailer from email address
export const EMAIL_FROM = process.env.EMAIL_FROM || "";

// business owners email addresses
export const OWNERS_EMAILS = process.env.OWNERS_EMAILS || "";

// days required to prepare for an event
export const DAYS_TO_PREPARE = Number(process.env.DAYS_TO_PREPARE || 7);
