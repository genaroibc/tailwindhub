"use client";

// import { SEARCH_FILTERS } from "@/constants";
import { SearchIcon } from "../Icons";

export function Search() {
  return (
    <form className="flex flex-wrap items-center justify-center gap-4 bg-white p-4 max-w-full my-0 mx-auto rounded-lg">
      <input
        type="text"
        placeholder="Search for components..."
        className="py-2 px-4 rounded-lg text-base min-w-0"
      />
      <button className="flex items-center justify-center gap-2 bg-secondary-color hover:bg-tertiary-color">
        <span className="hidden sm:block">search</span>
        <SearchIcon width="20" fill="#333" />
      </button>
      {/* <select className="py-2 px-4 rounded-lg text-base text-dimmed-dark bg-secondary-color">
        {SEARCH_FILTERS.map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select> */}
    </form>
  );
}
