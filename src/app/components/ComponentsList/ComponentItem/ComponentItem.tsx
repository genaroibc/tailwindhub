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
  tags,
  title,
}: Props) {
  return (
    <article className={styles.item} key={id}>
      <div className={styles.item__preview}>
        <div dangerouslySetInnerHTML={{ __html: html_code }}></div>
      </div>

      <footer className={styles.item__footer}>
        <h6 className={styles.item__footer__title}>{title}</h6>
        <pre>{JSON.stringify(tags)}</pre>
        <a
          className={styles.item__footer__author}
          href={`https://github.com/${author_username}`}
        >
          <img
            className={styles.item__footer__author__avatar}
            src="https://avatars.githubusercontent.com/u/98661193?v=4"
            alt="user avatar"
            width={30}
            height={30}
          />
          @{author_username}
        </a>

        <ComponentItemNavBar
          likes={likes}
          downloads={downloads}
          textToCopy={html_code}
        />
      </footer>
    </article>
  );
}
