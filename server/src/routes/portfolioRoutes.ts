import express from "express";
import { getPortfolio } from "../controllers/portfolioController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/portfolio/", getPortfolio);

export default router;
