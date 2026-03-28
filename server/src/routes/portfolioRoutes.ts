import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createPortfolioController,
  getMyPortfolioController,
  getPublicPortfolioController,
  createLinksController,
  updateSkillsController,
  updateExperienceController,
  updateProjectsController,
  updateEducationController,
  publishPortfolioController,
  unpublishPortfolioController,
  deleteSkillsController,
  deleteProjectsController,
  deleteExperienceController,
  deleteEducationController,
} from "../controllers/portfolioController";

const router = express.Router();

router.get("/portfolio/me", authMiddleware, getMyPortfolioController);
router.get("/portfolio/public/:username", getPublicPortfolioController);

router.post("/portfolio", authMiddleware, createPortfolioController);
router.post("/portfolio/links", authMiddleware, createLinksController);

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

router.delete(
  "/portfolio/remove/skills/:deleteId",
  authMiddleware,
  deleteSkillsController,
);

router.delete(
  "/portfolio/remove/projects/:deleteId",
  authMiddleware,
  deleteProjectsController,
);

router.delete(
  "/portfolio/remove/experience/:deleteId",
  authMiddleware,
  deleteExperienceController,
);

router.delete(
  "/portfolio/remove/education/:deleteId",
  authMiddleware,
  deleteEducationController,
);

export default router;
