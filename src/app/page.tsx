import styles from "@/app/page.module.css";
import { Hero } from "./components/Hero/Hero";
import { ComponentsList } from "./components/ComponentsList/ComponentsList";
import { Search } from "./components/shared/Search/Search";

export default async function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <Search />
      <ComponentsList />
    </div>
  );
}
