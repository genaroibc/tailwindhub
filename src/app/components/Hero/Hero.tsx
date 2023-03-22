import Link from "next/link";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to TailwindHub</h1>
        <p className={styles.subtitle}>
          The best place to share Tailwind components
        </p>
        <Link href="/editor" className={styles.button}>
          Go to editor
        </Link>
      </div>
    </div>
  );
}
