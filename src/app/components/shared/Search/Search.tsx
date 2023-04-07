"use client";

// import { SEARCH_FILTERS } from "@/constants";
import { SearchIcon } from "../Icons";
import { Button } from "@/app/components/shared/Button";

export function Search() {
  return (
    <form className="flex flex-wrap items-center justify-center bg-white p-2 max-w-full my-0 mx-auto rounded-lg">
      <input
        type="text"
        placeholder="Search for components..."
        className="py-2 px-4 rounded-tl-lg rounded-bl-lg text-base min-w-0"
      />
      <Button variant="secondary" className="rounded-tr-lg rounded-br-lg">
        <SearchIcon width="20" fill="#333" />
      </Button>
      {/* <select className="py-2 px-4 rounded-lg text-base text-dimmed-black bg-secondary-color">
        {SEARCH_FILTERS.map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select> */}
    </form>
  );
}
