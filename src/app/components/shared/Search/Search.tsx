"use client";

// import { SEARCH_FILTERS } from "@/constants";
import { SearchIcon } from "../Icons";
import styles from "./Search.module.css";

export function Search() {
  return (
    <form className={styles.search_container}>
      <input
        type="text"
        placeholder="Search for components..."
        className={styles.search_container__search_input}
      />
      <button className={styles.search_container__search_button}>
        <span>search</span>
        <SearchIcon width="20" color="#333" />
      </button>
      {/* <select className={styles.filters_list}>
        {SEARCH_FILTERS.map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select> */}
    </form>
  );
}
