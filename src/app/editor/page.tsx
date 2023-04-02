import { type Metadata } from "next";
import { EditorSection } from "@/app/editor/components/EditorSection/EditorSection";
import { TailwindScript } from "@/app/components/shared/TailwindScript";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Editor - TailwindHub",
  description: "Create and publish your own Tailwind components",
};

function HomePage() {
  return (
    <div className={styles.page_wrapper}>
      <main className={styles.page_wrapper__main}>
        <TailwindScript />
        <EditorSection />
      </main>
    </div>
  );
}

export default HomePage;
