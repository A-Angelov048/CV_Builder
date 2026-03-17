import { Request, Response } from "express";
import imageDelete from "../utils/cloudinaryImageDelete";
import {
  createPortfolio,
  getMyPortfolio,
  getPublicPortfolio,
  togglePublish,
  updatePortfolioSection,
} from "../services/portfolioService";

export async function createPortfolioController(req: Request, res: Response) {
  const userId = req.userId;
  const username = req.username;
  const body = req.body;

  try {
    const portfolio = await createPortfolio(userId, username, body);
    res.status(201).json(portfolio);
  } catch (err: any) {
    const imageProfileId = body.about.imageProfile.public_id;
    const imageBackgroundId = body.about.imageBackground.public_id;
    if (imageProfileId && imageBackgroundId) {
      imageDelete(imageProfileId, imageBackgroundId);
    }
    res.status(400).json({ message: "Failed to create portfolio" });
  }
}

export async function getMyPortfolioController(req: Request, res: Response) {
  const userId = req.userId;

  try {
    const portfolio = await getMyPortfolio(userId);

    if (!portfolio) {
      throw new Error("Portfolio not found.");
    }

    res.json(portfolio);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
}

export async function getPublicPortfolioController(
  req: Request,
  res: Response
) {
  const username = req.params.username;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const portfolio = await getPublicPortfolio(username);

    if (!portfolio) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.json(portfolio);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function createLinksController(req: Request, res: Response) {
  const userId = req.userId;
  const body = req.body;

  try {
    const portfolio = await updatePortfolioSection(userId, "links", body);

    res.json(portfolio);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateSkillsController(req: Request, res: Response) {
  const userId = req.userId;
  const body = req.body;

  try {
    const portfolio = await updatePortfolioSection(userId, "skills", body);

    res.json(portfolio);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateProjectsController(req: Request, res: Response) {
  const userId = req.userId;
  const body = req.body;

  try {
    const portfolio = await updatePortfolioSection(userId, "projects", body);

    res.json(portfolio);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateExperienceController(req: Request, res: Response) {
  const userId = req.userId;
  const body = req.body;

  try {
    const portfolio = await updatePortfolioSection(userId, "experience", body);

    res.json(portfolio);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function updateEducationController(req: Request, res: Response) {
  const userId = req.userId;
  const body = req.body;

  try {
    const portfolio = await updatePortfolioSection(userId, "education", body);

    res.json(portfolio);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function publishPortfolioController(req: Request, res: Response) {
  const userId = req.userId;

  try {
    const portfolio = await togglePublish(userId, true);

    res.json(portfolio);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function unpublishPortfolioController(
  req: Request,
  res: Response
) {
  const userId = req.userId;

  try {
    const portfolio = await togglePublish(userId, false);

    res.json(portfolio);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
