type Params = {
  imageURL: string;
};

export function getCroppedCloudinaryImageURL({ imageURL }: Params) {
  if (!imageURL) return "";

  return imageURL.replace(
    "/image/upload",
    "/image/upload/w_400,h_400,ar_1,c_fill"
  );
}
