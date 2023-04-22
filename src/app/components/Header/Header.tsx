"use client";

import Link from "next/link";
import { Login } from "@/app/components/shared/Login";
import styles from "./Header.module.css";
import { useRef } from "react";
import { TailwindHubLogo } from "@/app/components/shared/Icons";

export function Header() {
  const menuRef = useRef<HTMLHeadingElement>(null);

  const toggleMenu = () => {
    menuRef.current?.classList.toggle(styles.menu_visible);
  };

  return (
    <header className={styles.page_header}>
      <span className={styles.brand_name}>
        <TailwindHubLogo />
        <span>TailwindHub</span>
      </span>
      <nav onClick={toggleMenu} ref={menuRef} className={styles.hamburger_menu}>
        <Link className={styles.hamburger_menu_link} href="/editor">
          Editor
        </Link>
        <Link className={styles.hamburger_menu_link} href="/">
          Home
        </Link>
      </nav>
      <Login />

      <button
        onClick={toggleMenu}
        aria-label="open menu button"
        className={styles.hamburger_menu_btn}
      >
        <span className={styles.hamburger_stick}></span>
        <span className={styles.hamburger_stick}></span>
        <span className={styles.hamburger_stick}></span>
      </button>
    </header>
  );
}
