import styles from "@/app/page.module.css";
import { Hero } from "./components/Hero/Hero";
import { ComponentsList } from "./components/ComponentsList/ComponentsList";
import { Search } from "./components/shared/Search/Search";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "TailwindHub - UI components",
  description: "The best place to share Tailwind components",
};

export const revalidate = 0;

export default async function Home() {
  return (
    <div className={styles.container}>
      <Hero />
      <Search />
      {/* @ts-expect-error Server Component */}
      <ComponentsList />
    </div>
  );
}
