"use client";

import styles from "./Search.module.css";

const OPTIONS_LIST = [
  { value: "all", title: "All categories" },
  { value: "button", title: "Buttons" },
  { value: "card", title: "Cards" },
  { value: "form", title: "Forms" },
  { value: "navbar", title: "Navigation bars" },
  { value: "input", title: "Inputs" },
  { value: "image", title: "Images" },
];

export function Search() {
  return (
    <div className={styles.search_container}>
      <input
        type="text"
        placeholder="Search for components"
        className={styles.search_container__search_input}
      />
      <select className={styles.filters_list}>
        {OPTIONS_LIST.map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>
    </div>
  );
}
