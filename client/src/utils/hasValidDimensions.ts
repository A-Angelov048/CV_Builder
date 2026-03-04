export default function hasValidDimensions(
  file: File,
  minDimensions: { width: number; height: number },
  maxDimensions: { width: number; height: number },
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        const meetsDimensions =
          img.width >= minDimensions.width &&
          img.height >= minDimensions.height &&
          img.width <= maxDimensions.width &&
          img.height <= maxDimensions.height;

        resolve(meetsDimensions);
      };

      img.src = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}
