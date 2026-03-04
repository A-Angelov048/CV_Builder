import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

function expressConfig(app: express.Application) {
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
}

export default expressConfig;
