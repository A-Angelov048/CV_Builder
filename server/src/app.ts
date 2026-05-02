import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRouter from "./routes/userRoutes";
import portfolioRouter from "./routes/portfolioRoutes";
import cloudinaryConfig from "./config/cloudinary";
import expressConfig from "./config/expressConfig";

const app = express();
cloudinaryConfig();
expressConfig(app);

app.use(userRouter);
app.use(portfolioRouter);

export default app;
