import imageCompression from "browser-image-compression";

const compressImage = async (file: File): Promise<File> => {
  return imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  });
};

export default compressImage;
