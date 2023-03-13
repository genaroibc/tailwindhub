import Link from "next/link";
import { Login } from "../shared/Login/Login";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__navbar}>
        <Link className={styles.header__navbar__link} href="/editor">
          Editor
        </Link>
        <Link className={styles.header__navbar__link} href="/">
          Home
        </Link>
      </nav>
      <Login />
    </header>
  );
}
