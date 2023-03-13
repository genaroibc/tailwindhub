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
        <option className={styles.filters_list__option} value="all">
          All categories
        </option>
        <option className={styles.filters_list__option} value="buttons">
          Buttons
        </option>
        <option className={styles.filters_list__option} value="cards">
          Cards
        </option>
        <option className={styles.filters_list__option} value="forms">
          Forms
        </option>
        <option className={styles.filters_list__option} value="navbars">
          Navbars
        </option>
      </select>
    </div>
  );
}
