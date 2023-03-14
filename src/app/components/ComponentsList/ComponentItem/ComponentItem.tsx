import { Database } from "@/types/db";
import styles from "./ComponentItem.module.css";

type Props = Database["public"]["Tables"]["components"]["Row"];

export function ComponentItem({ author_username, html_code, id }: Props) {
  return (
    <article className={styles.item} key={id}>
      <div
        className={styles.item__preview}
        dangerouslySetInnerHTML={{ __html: html_code }}
      ></div>
      <span className={styles.item__author_username}>@{author_username}</span>
    </article>
  );
}
