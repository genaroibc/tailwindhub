import { type ComponentItem as TComponentItem } from "@/types";
import { ComponentItemNavBar } from "@/app/(with-header)/components/ComponentsList/ComponentItem/ComponentItemNavBar";

type Props = TComponentItem;

export function ComponentItem({
  author_username,
  html_code,
  id,
  likes,
  title,
  preview_img,
  author_avatar_url,
  tags,
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

        <footer className="pt-4 bottom-0 w-full absolute opacity-0 duration-300 transition-opacity group-hover:opacity-100 bg-gradient-to-t from-black/60 to-black/0 min-h-[4rem] rounded-bl-2xl rounded-br-2xl flex flex-col justify-end">
          <div className="opacity-0 invisible duration-300 transition-[transform,visibility,opacity] translate-y-2 flex justify-between items-end gap-2 p-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
            <ul className="hidden md:flex gap-x-1 gap-y-2 items-center justify-start flex-wrap-reverse text-xs">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="bg-primary-color text-dimmed-black py-1 px-2 rounded-full"
                >
                  {tag}
                </li>
              ))}
            </ul>
            <ComponentItemNavBar
              componentId={id}
              likes={likes}
              textToCopy={html_code}
            />
          </div>
        </footer>
      </div>

      <footer className="flex flex-row gap-2 py-4 px-0 bg-transparent text-primary-color items-center">
        <img
          className="rounded-full w-full max-w-[2.5rem] max-h-[2.5rem] h-full aspect-square bg-pink-200 font-normal"
          src={author_avatar_url}
          alt={`${author_username} avatar`}
          width={30}
          height={30}
        />

        <div className="flex flex-col gap-1 justify-center items-start overflow-hidden">
          <span className="text-base font-semibold w-full overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </span>
          <a className="text-xs" href={`https://github.com/${author_username}`}>
            @{author_username}
          </a>
        </div>
      </footer>
    </article>
  );
}
