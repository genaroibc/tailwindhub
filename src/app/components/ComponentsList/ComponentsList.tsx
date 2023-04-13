"use client";

import { ComponentItem } from "./ComponentItem/ComponentItem";
import { Search } from "@/app/components/shared/Search/Search";
import { type ComponentItem as TComponentItem } from "@/types";
import { useSupabase } from "@/hooks/useSupabase";
import { useCallback, useState } from "react";
import { SearchData } from "@/types";

type Props = {
  defaultComponents: TComponentItem[];
};

export function ComponentsList({ defaultComponents }: Props) {
  const [components, setComponents] =
    useState<TComponentItem[]>(defaultComponents);
  const [error, setError] = useState<string | null>(null);

  const { supabase } = useSupabase();

  const handleSearch = useCallback(
    async ({ selectedTag, query }: SearchData) => {
      const normalizedQuery = query?.trim().toLowerCase();
      const normalizedSelectedTag = selectedTag?.trim().toLowerCase();

      if (!normalizedQuery && normalizedSelectedTag === "all") {
        return setComponents(defaultComponents);
      }

      if (!normalizedQuery && normalizedSelectedTag !== "all") {
        return setComponents(
          defaultComponents.filter((component) =>
            component.tags.includes(normalizedSelectedTag)
          )
        );
      }

      const res = await supabase
        .from("components")
        .select("likes (author_username),*")
        .textSearch("title", `'${normalizedQuery ?? ""}'`)
        .eq(
          "tags",
          `{${normalizedSelectedTag === "all" ? "" : normalizedSelectedTag}}`
        );

      if (res.error) {
        return setError(res.error.message);
      }

      setComponents(res.data as TComponentItem[]);
    },
    [supabase, setComponents, setError, defaultComponents]
  );

  return (
    <section className="flex flex-col gap-8 py-20 px-2 md:px-4 bg-dimmed-black">
      <Search onSearch={handleSearch} />
      {error && <p className="text-red-500">{error}</p>}
      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] md:grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-8 w-full max-w-page-max-width my-0 mx-auto">
        {components.map((component) => (
          <ComponentItem key={component.id} {...component} />
        ))}
      </section>
    </section>
  );
}
