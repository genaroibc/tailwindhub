import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "My default title";

  const hasUsername = searchParams.has("username");
  const username = hasUsername
    ? searchParams.get("username")?.slice(0, 100)
    : "My default username";

  const hasImage = searchParams.has("image");
  const image = hasImage
    ? searchParams.get("image")?.slice(0, 100)
    : "My default image";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
        }}
      >
        <div tw="flex flex-col items-center justify-center w-full h-full">
          <div tw="flex flex-col md:flex-row w-full py-12 px-8 md:items-center justify-between p-12">
            <div tw="flex flex-col">
              <h2 tw="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-200 text-left">
                {title}
              </h2>
              <span tw="text-neutral-300">/{username}</span>
            </div>
            <img
              tw="w-32 h-32 rounded-full"
              src={image}
              alt="Profile image"
              width={320}
              height={320}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
