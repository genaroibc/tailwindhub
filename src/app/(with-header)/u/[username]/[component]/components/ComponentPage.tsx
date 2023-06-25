import { ComponentItem } from "@/types";
import { getRelativeTime } from "@/utils/get-relative-time";
import {
  IconCalendarEvent,
  IconCode,
  IconEye,
  IconHeart,
} from "@tabler/icons-react";
import { ComponentCode } from "./ComponentCode";
import { ComponentPreview } from "./ComponentPreview";
import { Tabs } from "@/app/components/shared/Tabs";
import { encode } from "@/utils/encode-decode-url";
import { CopyToClipboardButton } from "@/app/components/shared/CopyToClipboardButton";

type ComponentPageProps = ComponentItem;

export function ComponentPage({
  author_avatar_url,
  author_username,
  created_at,
  html_code,
  likes,
  tags,
  title,
}: ComponentPageProps) {
  return (
    <article className="bg-slate-950 rounded-lg shadow-lg flex-col gap-4 p-8">
      <div className="max-w-page-max-width mx-auto">
        <h1 className="text-4xl mt-4 mb-8 font-semibold">{title}</h1>

        <div className="flex my-4 flex-col gap-4">
          <p className="text-gray-200 text-xl flex gap-2">
            <a
              href={`/u/${author_username}`}
              className="flex gap-2 items-center"
            >
              <img
                width={30}
                height={30}
                className="rounded-full"
                src={author_avatar_url}
                alt={author_username}
              />
              {author_username}
            </a>
          </p>

          <p className="flex items-center gap-2">
            <IconHeart /> {likes?.length} likes
          </p>

          <p className="text-gray-300 flex gap-2 items-center">
            <span>
              <IconCalendarEvent />
            </span>

            <span>
              created{" "}
              <time dateTime={created_at}>
                {getRelativeTime(new Date(created_at ?? 0).getTime())}
              </time>
            </span>
          </p>

          <div className="mt-4">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-slate-800 text-white text-sm px-2 py-1 rounded-lg mr-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Tabs
          items={[
            {
              label: (
                <span className="flex items-center gap-2">
                  Preview <IconEye />
                </span>
              ),
              element: (
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <NavBar code={html_code} />
                  </div>
                  <ComponentPreview code={html_code} />
                </div>
              ),
              id: 1,
            },
            {
              label: (
                <span className="flex items-center gap-2">
                  Code <IconCode />
                </span>
              ),
              element: (
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10">
                    <NavBar code={html_code} />
                  </div>
                  <ComponentCode code={html_code} />
                </div>
              ),
              id: 2,
            },
          ]}
        />
      </div>
    </article>
  );
}

const NavBar = ({ code }: { code: string }) => {
  return (
    <section>
      <nav className="flex gap-4 items-center">
        <a
          className="bg-tailwind-dark hover:bg-tailwind-normal font-medium flex items-center max-w-fit gap-2 py-2 px-4 rounded-md"
          href={`/editor?html_code=${encode(code)}`}
        >
          <IconCode />
          Open in editor
        </a>

        <CopyToClipboardButton
          textToCopy={code}
          className="bg-tailwind-dark hover:bg-tailwind-normal font-medium flex items-center max-w-fit gap-2 py-2 px-4 rounded-md"
        >
          Copy
        </CopyToClipboardButton>
      </nav>
    </section>
  );
};
