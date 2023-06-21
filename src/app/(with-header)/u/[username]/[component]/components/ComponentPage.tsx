import { Code } from "bright";
import { ComponentItem } from "@/types";
import { getRelativeTime } from "@/utils/get-relative-time";
import { IconCalendarEvent, IconCode, IconHeart } from "@tabler/icons-react";
import { ComponentPreview } from "./ComponentPreview";

type ComponentPageProps = ComponentItem;

export function ComponentPage({
  author_avatar_url,
  author_username,
  created_at,
  html_code,
  likes,
  preview_img,
  tags,
  title,
}: ComponentPageProps) {
  return (
    <article className="bg-slate-950 rounded-lg shadow-lg flex-col gap-4 p-8">
      <div className="max-w-page-max-width mx-auto">
        <div className="gap-8 flex items-center">
          <img className="rounded-lg" src={preview_img} alt={title} />

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl mb-4 font-semibold">{title}</h1>

            <p className="text-gray-200 text-xl">
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
              <IconHeart /> {likes.length}
            </p>

            <p className="text-gray-300 flex gap-2 items-center">
              <span>
                <IconCalendarEvent />
              </span>

              <span>
                created{" "}
                <time dateTime={created_at}>
                  {getRelativeTime(new Date(created_at).getTime())}
                </time>
              </span>
            </p>

            <div className="mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-slate-800 text-white text-sm px-2 py-1 rounded-lg mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ComponentPreview code={html_code} />

        <div className="rounded-lg shadow-md relative">
          <a
            className="bg-slate-900 flex items-center max-w-fit gap-2 py-2 px-4 rounded-tl-md rounded-tr-md top-4 right-4 absolute"
            href={`/editor?html_code=${globalThis.encodeURIComponent(
              globalThis.btoa(html_code)
            )}`}
          >
            <IconCode />
            Open in editor
          </a>
          <pre className="p-4 my-8 bg-slate-800 text-gray-200 rounded-lg overflow-x-auto">
            {/* @ts-expect-error */}
            <Code lang="html" theme="material-ocean">
              {html_code}
            </Code>
          </pre>
        </div>
      </div>
    </article>
  );
}
