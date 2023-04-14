import { SEARCH_FILTERS } from "@/constants";
import { SearchIcon } from "../Icons";
import { Button } from "@/app/components/shared/Button";
import { useEffect, useState } from "react";
import { SearchData } from "@/types";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSearch: (data: SearchData) => void;
};

export function Search({ onSearch }: Props) {
  const [selectedTag, setSelectedTag] = useState<string>(
    SEARCH_FILTERS[0].value
  );
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      onSearch({ query, selectedTag });
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query, selectedTag, onSearch]);

  const handleTagFilterChange = (e: React.FormEvent) => {
    const selectedTag = (e.target as HTMLSelectElement).value;
    setSelectedTag(selectedTag);
  };

  const handleQueryChange = (e: React.FormEvent) => {
    const query = (e.target as HTMLInputElement).value;
    setQuery(query);
  };

  return (
    <form className="flex flex-wrap items-center justify-center bg-white text-black p-2 max-w-full my-0 mx-auto rounded-lg">
      <input
        onChange={handleQueryChange}
        type="text"
        name="search"
        placeholder="Search for components..."
        className="py-2 px-4 rounded-tl-lg rounded-bl-lg text-base min-w-0"
      />
      <Button variant="secondary" className="rounded-tr-lg rounded-br-lg">
        <SearchIcon width="20" fill="#333" />
      </Button>
      <select
        onChange={handleTagFilterChange}
        value={selectedTag}
        className="py-2 px-4 rounded-lg text-base text-dimmed-black bg-secondary-color"
      >
        {SEARCH_FILTERS.map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>
    </form>
  );
}
