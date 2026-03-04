import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createPortfolioController,
  getMyPortfolioController,
  getPublicPortfolioController,
  updateLinksController,
  updateSkillsController,
  updateExperienceController,
  updateProjectsController,
  updateEducationController,
  publishPortfolioController,
  unpublishPortfolioController,
} from "../controllers/portfolioController";

const router = express.Router();

router.get("/portfolio/me", authMiddleware, getMyPortfolioController);
router.get("/portfolio/public/:username", getPublicPortfolioController);

router.post("/portfolio", authMiddleware, createPortfolioController);

router.put("/portfolio/links", authMiddleware, updateLinksController);
router.put("/portfolio/skills", authMiddleware, updateSkillsController);
router.put("/portfolio/experience", authMiddleware, updateExperienceController);
router.put("/portfolio/projects", authMiddleware, updateProjectsController);
router.put("/portfolio/education", authMiddleware, updateEducationController);

router.patch("/portfolio/publish", authMiddleware, publishPortfolioController);
router.patch(
  "/portfolio/unpublish",
  authMiddleware,
  unpublishPortfolioController,
);

export default router;
