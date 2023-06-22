import { BASE_URL } from "@/constants";
import { supabase } from "@/lib/supabase";
import { unsluglify } from "@/utils/url-formatting";
import { ImageResponse } from "next/server";

export const runtime = "edge";

const ONLY_TITLE_IMAGE_URL = `${BASE_URL}/tailwindhub-only-title.png`;
const EMPTY_BG_IMAGE_URL = `${BASE_URL}/tailwindhub-empty.png`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const hasUsername = searchParams.has("username");
  const username = hasUsername
    ? searchParams.get("username")?.slice(0, 100)
    : "My default username";

  const hasImage = searchParams.has("image");
  const imageURL = hasImage
    ? searchParams.get("image")?.slice(0, 100)
    : `https://github.com/${username}.png`;

  // const hasType = searchParams.has("type");
  // const typeURL = hasType ? searchParams.get("type") : null;

  // const imgURL = typeURL === "component" ?  :

  const componentTitle = unsluglify(searchParams.get("component") ?? "");

  const { data } = await supabase
    .from("components")
    .select()
    .eq("title", componentTitle)
    .eq("author_username", username);

  const componentPreviewURL = data?.[0]?.preview_img;

  console.log({ BASE_URL, BG_IMAGE_URL: ONLY_TITLE_IMAGE_URL });
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
            {/* <h2 className="text-3xl font-bold flex gap-2 items-center">
              {componentTitle} by{" "}
              <img
                tw="w-14 h-14 rounded-full"
                width="56"
                height="56"
                src={imageURL}
                alt={`${username}'s profile image`}
              />
              <h2 tw="font-bold tracking-tight text-left">{username}</h2>
            </h2> */}

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
              src={imageURL}
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
