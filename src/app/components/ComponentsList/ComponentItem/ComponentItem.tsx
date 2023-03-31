import { Database } from "@/types/db";
import styles from "./ComponentItem.module.css";
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
}: Props) {
  return (
    <article className={styles.item} key={id}>
      <div className={styles.item__preview}>
        <img
          className={styles.item__preview__img}
          src={preview_img}
          alt={title}
        />

        <footer className={styles.item__preview__footer}>
          <ComponentItemNavBar
            likes={likes}
            downloads={downloads}
            textToCopy={html_code}
          />
        </footer>
      </div>

      <footer className={styles.item__footer}>
        {/* <pre>{JSON.stringify(tags)}</pre> */}
        <img
          className={styles.item__footer__author_avatar}
          // src="https://avatars.githubusercontent.com/u/98661193?v=4"
          src={"/svg/heart-solid.svg"}
          alt={`${author_username} avatar`}
          width={30}
          height={30}
        />

        <div className={styles.item__footer__info}>
          <span className={styles.item__footer__info__title}>{title}</span>
          <a
            className={styles.item__footer__info__author_username}
            href={`https://github.com/${author_username}`}
          >
            @{author_username}
          </a>
        </div>
      </footer>
    </article>
  );
}
