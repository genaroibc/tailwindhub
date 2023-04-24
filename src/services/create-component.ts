import { SUPABASE_ERRORS } from "@/constants";
import { KnownResult } from "@/types";
import { Database } from "@/types/db";
import { SupabaseClient } from "@supabase/supabase-js";
import { uploadImageToCloudinary } from "@/services/upload-image-to-cloudinary";
import { getCroppedCloudinaryImageURL } from "./get-cropped-cloudinary-image-url";

type ComponentData = Pick<
  Database["public"]["Tables"]["components"]["Insert"],
  "html_code" | "title" | "preview_img" | "tags"
> & { supabase: SupabaseClient };

export async function createComponent({
  title,
  tags,
  preview_img,
  html_code,
  supabase,
}: ComponentData): Promise<KnownResult<string>> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return { ok: false, error: "you must be logged in to publish" };
  }

  try {
    const uploadedImageResponse = await uploadImageToCloudinary({
      imageDataURL: preview_img,
    });

    if (!uploadedImageResponse.ok)
      return { ok: false, error: uploadedImageResponse.error };

    const { user_name, avatar_url } = session.user.user_metadata;

    if (!user_name || !avatar_url)
      return {
        ok: false,
        error: "There was an error with your session, please log in again",
      };

    const { error } = await supabase.from("components").insert({
      html_code,
      title,
      tags,
      author_username: user_name,
      author_avatar_url: avatar_url,
      preview_img: getCroppedCloudinaryImageURL({
        imageURL: uploadedImageResponse.data.url,
      }),
    });

    if (error) {
      return {
        ok: false,
        error: SUPABASE_ERRORS[error.code] ?? error.message,
      };
    }

    return { ok: true, data: "Component published successfully" };
  } catch (error) {
    return { ok: false, error: "There was an error publishing your component" };
  }
}
