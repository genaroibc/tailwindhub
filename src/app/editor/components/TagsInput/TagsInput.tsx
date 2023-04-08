import { COMPONENT_TAGS } from "@/constants";
import { useEffect, useState } from "react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onChange: (data: { tags: string[] }) => void;
};

export function TagsInput({ onChange }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    onChange({ tags: selectedTags });
  }, [selectedTags, onChange]);

  const handleInputChange = (event: React.ChangeEvent) => {
    const value = (event.target as HTMLInputElement).value.toLowerCase();

    const suggestions = COMPONENT_TAGS.filter((tag) => tag.indexOf(value) > -1);

    setInputValue(value);
    setSuggestions(suggestions.filter((tag) => !selectedTags.includes(tag)));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      (event.target as HTMLInputElement).blur();
      return setSuggestions([]);
    }
    if (event.key === "Tab" && inputValue) {
      event.preventDefault();

      suggestions.some((tag) => {
        if (tag.includes(inputValue)) {
          addTag(tag);
          return true;
        }

        return false;
      });
    }
  };

  const addTag = (tag: string) => {
    if (selectedTags.includes(tag)) return;
    setSelectedTags([...selectedTags, tag]);
    setInputValue("");
    setSuggestions([]);
  };

  const removeTag = (tag: string) => {
    if (tag) setSelectedTags((tags) => tags.filter((t) => t !== tag));
    setInputValue("");
    setSuggestions([]);
  };

  return (
    <section className="flex w-full">
      <div className="relative w-full">
        <input
          onFocus={(event) =>
            setSuggestions(
              COMPONENT_TAGS.filter(
                (tag) =>
                  !selectedTags.includes(tag) &&
                  tag.includes(event.target.value.toLowerCase())
              )
            )
          }
          // onBlur={() => setSuggestions([])}
          type="text"
          className="rounded-md bg-primary-color text-dimmed-black py-2 px-4"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add tags"
        />

        <ul
          onClick={() => console.log("propagation")}
          className="absolute max-h-[80vh] overflow-auto bottom-full left-0 right-0 bg-primary-color text-dimmed-black rounded-md"
        >
          {suggestions.map((tag) => (
            <li
              key={tag}
              className="py-1 px-2 cursor-pointer bg-primary-color text-dimmed-black hover:bg-light-brown hover:text-primary-color"
              onClick={() => addTag(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex flex-wrap gap-1">
        {selectedTags.map((tag) => (
          <li key={tag}>
            <button
              className="bg-dimmed-black text-primary-color rounded-full py-2 px-4 w-fit"
              onClick={() => removeTag(tag)}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
