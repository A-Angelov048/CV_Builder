import { Portfolio } from "../types/portfolioTypes";
import { v2 as cloudinary } from "cloudinary";

export default async function imageDelete(
  oldImageProfileId: string,
  oldImageBackgroundId: string,
  data?: Portfolio,
) {
  if (
    oldImageProfileId &&
    oldImageProfileId !== data?.about.imageProfile.public_id
  ) {
    await cloudinary.uploader.destroy(oldImageProfileId);
  }
  if (
    oldImageBackgroundId &&
    oldImageBackgroundId !== data?.about.imageBackground.public_id
  ) {
    await cloudinary.uploader.destroy(oldImageBackgroundId);
  }
}
