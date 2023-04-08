import { Database } from "@/types/db";
import { ComponentItemNavBar } from "./ComponentItemNavBar/ComponentItemNavBar";

type Props = Database["public"]["Tables"]["components"]["Row"];

export function ComponentItem({
  author_username,
  html_code,
  id,
  downloads,
  likes,
  // tags,
  title,
  preview_img,
  author_avatar_url,
}: Props) {
  return (
    <article
      className="max-w-full self-stretch flex flex-col items-stretch justify-between bg-transparent"
      key={id}
    >
      <div className="relative group">
        <img
          className="block w-full aspect-square object-cover rounded-2xl relative"
          src={preview_img}
          alt={title}
        />

        <footer className="absolute bottom-2 right-2 opacity-0 invisible duration-300 transition-[transform,visibility,opacity] translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible">
          <ComponentItemNavBar
            likes={likes}
            downloads={downloads}
            textToCopy={html_code}
          />
        </footer>
      </div>

      <footer className="flex flex-row gap-2 py-4 px-0 bg-transparent text-primary-color items-center">
        {/* <pre>{JSON.stringify(tags)}</pre> */}
        <img
          className="rounded-full max-w-[3rem] aspect-square bg-pink-200 font-normal"
          src={author_avatar_url}
          alt={`${author_username} avatar`}
          width={30}
          height={30}
        />

        <div className="flex flex-col gap-2 justify-center items-start overflow-hidden">
          <span className="text-base font-semibold w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </span>
          <a
            className="flex items-center gap-2 text-xs bg-transparent"
            href={`https://github.com/${author_username}`}
          >
            @{author_username}
          </a>
        </div>
      </footer>
    </article>
  );
}
