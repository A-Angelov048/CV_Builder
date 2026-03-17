import { PortfolioModel } from "../models/portfolio";
import { Portfolio } from "../types/portfolioTypes";
import imageDelete from "../utils/cloudinaryImageDelete";

export const createPortfolio = async (
  userId: string,
  username: string,
  body: Portfolio,
) => {
  const exists = await PortfolioModel.findOne({ owner: userId });

  if (!exists) {
    const portfolioDB = await PortfolioModel.create({
      ...body,
      owner: userId,
      username,
      isPublished: false,
    });

    return portfolioDB;
  }

  const oldImageProfileId = exists.about.imageProfile.public_id;
  const oldImageBackgroundId = exists.about.imageBackground.public_id;

  await imageDelete(oldImageProfileId, oldImageBackgroundId, body);

  return updatePortfolioSection(userId, "about", body.about);
};

export const getMyPortfolio = async (userId: string) => {
  return PortfolioModel.findOne({ owner: userId });
};

export const getPublicPortfolio = async (username: string) => {
  return PortfolioModel.findOne({
    username,
    isPublished: true,
  });
};

export const updatePortfolioSection = async <T>(
  userId: string,
  section: keyof Portfolio,
  body: T,
) => {
  const operation =
    section !== "about" && section !== "links" ? "$push" : "$set";

  const portfolio = await PortfolioModel.findOneAndUpdate(
    { owner: userId },
    { [operation]: { [section]: body } },
    { new: true, runValidators: true },
  ).select(section === "about" ? "about username owner isPublished" : section);

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  return portfolio;
};

export const togglePublish = async (userId: string, publish: boolean) => {
  const portfolio = await PortfolioModel.findOneAndUpdate(
    { owner: userId },
    { isPublished: publish },
    { new: true },
  );

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  return portfolio;
};
