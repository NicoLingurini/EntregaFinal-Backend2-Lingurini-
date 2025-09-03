import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES = process.env.JWT_EXPIRES || "1d";
export const COOKIE_NAME = process.env.COOKIE_NAME || "jwt";

export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = Number(process.env.MAIL_PORT || 587);
export const MAIL_USER = process.env.MAIL_USER;
export const MAIL_PASS = process.env.MAIL_PASS;
export const MAIL_FROM =
  process.env.MAIL_FROM || "Ecommerce <no-reply@ecommerce.local>";
export const APP_URL = process.env.APP_URL || "http://localhost:8080";

export const JWT_RESET_SECRET =
  process.env.JWT_RESET_SECRET || process.env.JWT_SECRET + "_reset";
export const JWT_RESET_EXPIRES = process.env.JWT_RESET_EXPIRES || "1h";
