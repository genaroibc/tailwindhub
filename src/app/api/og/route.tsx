import { BASE_URL } from "@/constants";
import { supabase } from "@/lib/supabase";
import { unsluglify } from "@/utils/url-formatting";
import { ImageResponse } from "next/server";

export const runtime = "edge";

const ONLY_TITLE_IMAGE_URL = `${BASE_URL}/tailwindhub-only-title.png`;
const EMPTY_BG_IMAGE_URL = `${BASE_URL}/tailwindhub-empty.png`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const username = searchParams.get("username");
  const component = searchParams.get("component");

  if (!username) {
    return new Response("Invalid request: No username provided", {
      status: 400,
    });
  }

  let componentPreviewURL = null;

  if (component) {
    const componentTitle = unsluglify(component);

    const { data } = await supabase
      .from("components")
      .select()
      .eq("title", componentTitle)
      .eq("author_username", username);

    componentPreviewURL = data?.[0]?.preview_img;

    if (!componentPreviewURL) {
      return new Response("Error: No component found", {
        status: 404,
      });
    }
  }

  const userAvatarURL = `https://github.com/${username}.png`;

  return new ImageResponse(
    (
      <article tw="h-screen flex items-center justify-center text-black w-full relative">
        <img
          width={1200}
          height={630}
          src={
            componentPreviewURL != null
              ? EMPTY_BG_IMAGE_URL
              : ONLY_TITLE_IMAGE_URL
          }
          alt=""
          className="absolute inset-0"
        />

        {componentPreviewURL != null ? (
          <div tw="h-screen flex flex-col items-center justify-center text-black w-full absolute inset-0 bg-white">
            <img
              width={600}
              height={600}
              src={componentPreviewURL}
              alt=""
              className="rounded-xl"
            />
          </div>
        ) : (
          <div tw="h-screen flex items-center justify-center text-black w-full absolute inset-0 pt-28">
            <img
              tw="w-20 h-20 rounded-full mt-4"
              width="320"
              height="320"
              src={userAvatarURL}
              alt={`${username}'s profile image`}
            />
            <div tw="flex flex-col ml-3 justify-center">
              <h2 tw="text-3xl sm:text-4xl font-bold tracking-tight text-left ">
                {username}
              </h2>
              <span>tailwindhub.dev/u/{username}</span>
            </div>
          </div>
        )}
      </article>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
