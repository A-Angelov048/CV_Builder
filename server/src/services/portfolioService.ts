import { PortfolioModel } from "../models/portfolio";
import { User } from "../models/user";
import { Portfolio, PortfolioKey } from "../types/portfolioTypes";
import imageDelete from "../utils/cloudinaryImageDelete";
import nodemailer from "nodemailer";

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

  try {
    const portfolio = await updatePortfolioSection(userId, "about", body.about);

    if (
      !!exists?.about.imageBackground?.public_id &&
      !!exists?.about.imageProfile?.public_id
    ) {
      const oldImageProfileId = exists.about.imageProfile.public_id;
      const oldImageBackgroundId = exists.about.imageBackground.public_id;

      await imageDelete(oldImageProfileId, oldImageBackgroundId, body);
    }

    return portfolio;
  } catch (err: any) {
    const imageProfileId = body.about.imageProfile.public_id;
    const imageBackgroundId = body.about.imageBackground.public_id;
    if (imageProfileId && imageBackgroundId) {
      imageDelete(imageProfileId, imageBackgroundId);
    }
    throw err;
  }
};

export const getMyPortfolio = async (userId: string) => {
  const portfolio = await PortfolioModel.findOne({ owner: userId });

  if (!portfolio) {
    throw new Error("Portfolio not found.");
  }

  portfolio.experience.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  portfolio.education.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return portfolio;
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

  if (!portfolio) {
    throw new Error("Portfolio not found.");
  }

  portfolio.experience.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  portfolio.education.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

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

  if (section === "experience") {
    portfolio.experience.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  if (section === "education") {
    portfolio.education.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  return portfolio;
};

export const togglePublish = async (userId: string, publish: boolean) => {
  const portfolio = await PortfolioModel.findOneAndUpdate(
    { owner: userId },
    { isPublished: publish },
    { new: true },
  ).select("isPublished");

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

  if (section === "experience") {
    portfolio.experience.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  if (section === "education") {
    portfolio.education.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  return portfolio;
};

export const sendContactEmail = async (
  ownerId: string,
  firstName: string,
  lastName: string,
  email: string,
  message: string,
) => {
  const findPortfolio = await PortfolioModel.findOne({ owner: ownerId });

  if (!findPortfolio) {
    throw new Error("Portfolio not found");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log("EMAIL_USER exists:", !!process.env.EMAIL_USER);
  console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

  try {
    await transporter.verify();
    console.log("SMTP verified");
  } catch (error) {
    console.error("SMTP verify failed:", error);
  }

  const mailOptions = {
    from: `"${firstName} ${lastName}" <${email}>`,
    to: findPortfolio.about.email,
    subject: `New Contact Message from ${firstName} ${lastName}`,
    replyTo: findPortfolio.about.email,
    html: `
      <h3>New Message</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  transporter.sendMail(mailOptions);
};
