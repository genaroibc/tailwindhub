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
    : "https://avatars.githubusercontent.com/u/98661193?v=4";

  return new ImageResponse(
    (
      <div
        tw="h-screen flex items-center pt-28 gap-4 justify-center text-black w-full"
        style={{
          backgroundImage: "url(http://localhost:3000/tailwindhub-empty.png)",
        }}
      >
        <img
          tw="w-20 h-20 rounded-full mt-4"
          width="320"
          height="320"
          src={imageURL}
          alt={`${username}'s profile image`}
        />
        <div tw="flex flex-col gap3 ml-3 justify-center">
          <h2 tw="text-3xl sm:text-4xl font-bold tracking-tight text-left ">
            {username}
          </h2>
          <span>tailwindhub.dev/u/{username}</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
