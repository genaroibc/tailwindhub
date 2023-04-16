import { SEARCH_FILTERS } from "@/constants";
import { useEffect, useState } from "react";
import { SearchData } from "@/types";
import { IconSearch } from "@tabler/icons-react";

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
    <form className="flex gap-2 items-center justify-center bg-white text-black p-2 max-w-full my-0 mx-auto rounded-lg">
      <select
        onChange={handleTagFilterChange}
        value={selectedTag}
        className="rounded-0 rounded-tl-lg rounded-bl-lg py-2 px-4 text-base bg-transparent text-dimmed-black"
      >
        {SEARCH_FILTERS.map(({ title, value }) => (
          <option key={value} value={value}>
            {title}
          </option>
        ))}
      </select>

      <div className="flex items-center justify-center relative border-l">
        <input
          onChange={handleQueryChange}
          type="search"
          name="search"
          placeholder="Login form, user card"
          className="py-2 px-4 text-base min-w-0 flex-grow-0"
        />
        <button className="p-2 rounded-0 rounded-tr-lg rounded-br-lg bg-transparent border-transparent hover:bg-transparent">
          <IconSearch size="20" color="#333" />
        </button>
      </div>
    </form>
  );
}
