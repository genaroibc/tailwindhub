import { COMPONENT_TAGS_LIST } from "@/types";
import Select from "react-select";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onNewTags: (data: { tags: string[] }) => void;
};

export function TagsInput({ onNewTags: onNewTag }: Props) {
  return (
    <Select
      isMulti
      onChange={(selectedTags) => {
        onNewTag({ tags: selectedTags.map((tag) => tag.value) });
      }}
      classNames={{
        menuList: () => "bg-red-500 z-50",
      }}
      className="text-black w-full z-[500]"
      options={COMPONENT_TAGS_LIST.map((tag) => ({ value: tag, label: tag }))}
    />
  );
}
