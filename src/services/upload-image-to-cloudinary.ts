import ENV from "@/constants/env";
import { KnownResult } from "@/types";

type Params = {
  imageDataURL: string;
};

export async function uploadImageToCloudinary({
  imageDataURL,
}: Params): Promise<KnownResult<{ url: string }>> {
  try {
    const response = await fetch(ENV.NEXT_PUBLIC_CLOUDINARY_UPLOAD_API_URL, {
      method: "POST",
      body: JSON.stringify({
        file: imageDataURL,
        upload_preset: ENV.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const imageURL = data.secure_url;

    if (!imageURL) {
      return { ok: false, error: "there was an error uploading the image" };
    }

    return { ok: true, data: { url: imageURL } };
  } catch (error) {
    return { ok: false, error: "there was an error uploading the image" };
  }
}
