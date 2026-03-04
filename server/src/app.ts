import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRouter from "./routes/userRoutes";
import portfolioRouter from "./routes/portfolioRoutes";
import cloudinaryConfig from "./config/cloudinary";
import expressConfig from "./config/expressConfig";

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const app = express();
cloudinaryConfig();
expressConfig(app);

app.use(userRouter);
app.use(portfolioRouter);

export default app;
