"use client";

import { SEARCH_FILTERS } from "@/constants";
import styles from "./Search.module.css";

export function Search() {
  return (
    <div className={styles.search_container}>
      <input
        type="text"
        placeholder="Search for components"
        className={styles.search_container__search_input}
      />
      <select className={styles.filters_list}>
        {SEARCH_FILTERS.map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
}
