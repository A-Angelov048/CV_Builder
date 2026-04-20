import { PortfolioModel } from "../models/portfolio";
import { User } from "../models/user";
import { Portfolio, PortfolioKey } from "../types/portfolioTypes";
import imageDelete from "../utils/cloudinaryImageDelete";

export const createPortfolio = async (userId: string, body: Portfolio) => {
  const exists = await PortfolioModel.findOne({ owner: userId });

  if (!exists) {
    const portfolioDB = await PortfolioModel.create({
      ...body,
      owner: userId,
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
  const findUser = await User.findOne({ username: username });

  if (!findUser) {
    throw new Error("User not found");
  }

  const portfolio = await PortfolioModel.findOne({
    owner: findUser._id,
    isPublished: true,
  });

  return portfolio;
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
  ).select(section === "about" ? "about owner isPublished" : section);

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
export const deletePortfolioSection = async (
  userId: string,
  section: PortfolioKey,
  deleteId: string,
) => {
  const portfolio = await PortfolioModel.findOne({ owner: userId });

  if (!portfolio) {
    throw new Error("Portfolio not found");
  }

  const array = portfolio[section];
  const item = array.id(deleteId);

  if (!item) {
    throw new Error("Item not found");
  }

  item.deleteOne();

  await portfolio.save();

  return portfolio;
};
