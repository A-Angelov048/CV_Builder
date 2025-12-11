import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./routes/userRoutes";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(userRouter);

app.get("/", (req: any, res: any) => {
  res.json({ message: "Hello BE!" });
});

export default app;
