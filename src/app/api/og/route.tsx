import { BASE_URL } from "@/constants";
import { ImageResponse } from "next/server";

export const runtime = "edge";

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

  return new ImageResponse(
    (
      <article tw="h-screen flex items-center justify-center text-black w-full relative">
        <img
          src={`${BASE_URL}/tailwindhub-empty.png`}
          alt=""
          className="absolute inset-0"
        />

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
      </article>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
