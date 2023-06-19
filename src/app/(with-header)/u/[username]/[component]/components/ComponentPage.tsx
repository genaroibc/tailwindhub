import { ComponentItem } from "@/types";
import { IconHeart } from "@tabler/icons-react";

type ComponentPageProps = ComponentItem;

export function ComponentPage({
  author_avatar_url,
  author_username,
  html_code,
  likes,
  preview_img,
  tags,
  title,
}: ComponentPageProps) {
  return (
    <article className="bg-slate-700 rounded-lg shadow-lg flex-col gap-4 p-8 max-w-5xl mx-auto">
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

      <div className="rounded-lg shadow-md p-4">
        <pre className="p-4 bg-slate-800 text-gray-200 rounded-lg overflow-x-auto">
          <code>{html_code}</code>
        </pre>
      </div>
    </article>
  );
}
