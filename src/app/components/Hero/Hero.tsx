import styles from "./Hero.module.css";

export function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to TailwindHub</h1>
        <p className={styles.subtitle}>
          The best place to share Tailwind components
        </p>
        <button className={styles.button}>Get started</button>
      </div>
    </div>
  );
}
