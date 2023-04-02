import { COMPONENT_TAGS } from "@/constants";
import { useEffect, useState } from "react";
import styles from "./TagsInput.module.css";

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
    <section className={styles.tagInput}>
      <div className={styles.inputWrapper}>
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
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Add tags"
        />

        <ul
          onClick={() => console.log("propagation")}
          className={styles.suggestionList}
        >
          {suggestions.map((tag) => (
            <li
              key={tag}
              className={styles.suggestion}
              onClick={() => addTag(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <ul className={styles.tagList}>
        {selectedTags.map((tag) => (
          <li key={tag} className={styles.tag}>
            <button onClick={() => removeTag(tag)}>{tag}</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
