import { z } from "zod";
import hasValidDimensions from "../utils/hasValidDimensions";

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const MIN_DIMENSIONS = { width: 200, height: 200 };
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const imageSchema = ({
  maxDimensions,
  imageType,
}: {
  maxDimensions: { width: number; height: number };
  imageType: string;
}) =>
  z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, `${imageType} is required`)
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, {
      message: `The ${imageType} is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), {
      message: "Please upload a valid image file (JPEG, JPG, PNG, or WebP).",
    })
    .superRefine(async (files, ctx) => {
      const file = files?.[0];
      if (!file) return;

      const checkDimensions = await hasValidDimensions(file, MIN_DIMENSIONS, maxDimensions);

      if (!checkDimensions) {
        ctx.addIssue({
          code: "custom",
          message: `The ${imageType} dimensions are invalid. Please upload an image between ${MIN_DIMENSIONS.width}x${MIN_DIMENSIONS.height} and ${maxDimensions.width}x${maxDimensions.height} pixels.`,
        });
      }
    });

export default imageSchema;
