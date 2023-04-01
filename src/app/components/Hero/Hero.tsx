import Link from "next/link";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.main}>
        <h1 className={styles.title}>TailwindHub</h1>
        <p className={styles.subtitle}>
          The best place to share Tailwind components
        </p>
        <Link href="/editor" className={styles.button}>
          Go to editor
        </Link>
      </div>

      <div className={styles.images}>
        <img src="https://picsum.photos/200" alt="a login form component" />
        <img src="https://picsum.photos/200" alt="a user card component" />
        <img src="https://picsum.photos/200" alt="a fancy button component" />
        <img src="https://picsum.photos/200" alt="a unordered list component" />
      </div>
    </div>
  );
}
