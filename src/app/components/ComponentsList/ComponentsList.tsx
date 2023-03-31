import { Database } from "@/types/db";
import { ComponentItem } from "./ComponentItem/ComponentItem";
import { Search } from "@/app/components/shared/Search/Search";
import styles from "./ComponentsList.module.css";

type Props = {
  defaultComponents: Array<Database["public"]["Tables"]["components"]["Row"]>;
};

export function ComponentsList({ defaultComponents }: Props) {
  return (
    <section className={styles.container}>
      <Search />
      <section className={styles.components_list}>
        {defaultComponents.map((component) => (
          <ComponentItem key={component.id} {...component} />
        ))}
      </section>
    </section>
  );
}
