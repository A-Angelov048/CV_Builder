import compressImage from "../utils/imageCompression ";

type UploadResult = {
  imageProfile?: { image: string; public_id: string };
  imageBackground?: { image: string; public_id: string };
};

export const useCloudinaryUpload = () => {
  const uploadImage = async (
    file: File,
  ): Promise<{ image: string; public_id: string }> => {
    const compressed = await compressImage(file);

    const formData = new FormData();
    formData.append("file", compressed);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!res.ok) {
      throw new Error("Cloudinary upload failed, try again later");
    }

    const data = await res.json();

    return { image: data.secure_url, public_id: data.public_id };
  };

  const uploadImages = async (
    imageProfile?: File,
    imageBackground?: File,
  ): Promise<UploadResult> => {
    const [imageProfileResult, imageBackgroundResult] = await Promise.all([
      imageProfile ? uploadImage(imageProfile) : Promise.resolve(undefined),
      imageBackground
        ? uploadImage(imageBackground)
        : Promise.resolve(undefined),
    ]);

    return {
      imageProfile: imageProfileResult,
      imageBackground: imageBackgroundResult,
    };
  };

  return { uploadImages };
};
