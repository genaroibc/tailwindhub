import { COMPONENT_TAGS_LIST } from "@/types";
import { useId } from "react";
import Select from "react-select";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onNewTags: (data: { tags: string[] }) => void;
};

export function TagsInput({ onNewTags: onNewTag }: Props) {
  const selectID = useId();

  return (
    <Select
      instanceId={selectID}
      isMulti
      onChange={(selectedTags) => {
        onNewTag({ tags: selectedTags.map((tag) => tag.value) });
      }}
      className="text-black w-full"
      classNames={{
        option: () => "bg-slate-700 text-white hover:bg-slate-600",
        menuList: () => "bg-slate-700 rounded",
      }}
      options={COMPONENT_TAGS_LIST.map((tag) => ({ value: tag, label: tag }))}
    />
  );
}
