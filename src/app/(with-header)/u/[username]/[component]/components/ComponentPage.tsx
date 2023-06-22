import { ComponentItem } from "@/types";
import { getRelativeTime } from "@/utils/get-relative-time";
import { IconCalendarEvent, IconHeart } from "@tabler/icons-react";
import { ComponentPreview } from "./ComponentPreview";
import { ComponentCode } from "./ComponentCode";

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
            <IconHeart /> {likes.length} likes
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

        <ComponentPreview code={html_code} />

        <ComponentCode code={html_code} />
      </div>
    </article>
  );
}
