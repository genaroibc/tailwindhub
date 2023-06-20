"use client";

import { ComponentItem } from "@/app/(with-header)/components/ComponentsList/ComponentItem/ComponentItem";
import { Search } from "@/app/(with-header)/components/shared/Search";
import { type ComponentItem as TComponentItem } from "@/types";
import { useSupabase } from "@/hooks/useSupabase";
import { useCallback, useState } from "react";
import { SearchData } from "@/types";
import { ComponentItemSkeleton } from "@/app/(with-header)/components/ComponentsList/ComponentItem/ComponentItemSkeleton";
import Link from "next/link";

type Props = {
  defaultComponents: TComponentItem[];
  authorUsername?: string;
};

export function ComponentsList({ defaultComponents, authorUsername }: Props) {
  const [components, setComponents] =
    useState<TComponentItem[]>(defaultComponents);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { supabase } = useSupabase();

  const handleSearch = useCallback(
    async ({ selectedTag, query }: SearchData) => {
      setError(null);

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

      setLoading(true);
      const genericQuery = supabase
        .from("components")
        .select("likes (author_username),*");

      const withUsernameQuery = authorUsername
        ? genericQuery.eq("author_username", authorUsername)
        : genericQuery;

      const res = await withUsernameQuery
        .ilike("title", `%${normalizedQuery}%`)
        .contains(
          "tags",
          `{${normalizedSelectedTag === "all" ? "" : normalizedSelectedTag}}`
        );

      if (res.error) {
        setLoading(false);
        return setError(res.error.message);
      }

      setLoading(false);
      setComponents(res.data as TComponentItem[]);
    },
    [supabase, setComponents, setError, defaultComponents, authorUsername]
  );

  return (
    <section className="flex flex-col gap-8 py-20 px-2 md:px-4 bg-dimmed-black text-primary-color">
      <Search onSearch={handleSearch} />
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && !components.length && (
        <div className="flex flex-col gap-4 mx-auto text-center">
          <p>We didn&apos;t find any component that matches your search</p>
          <p>Why don&apos;t you create it?</p>

          <Link
            href="/editor"
            className="bg-primary-color text-dimmed-black max-w-fit mx-auto font-semibold py-2 px-4 rounded-md"
          >
            Go to editor
          </Link>
        </div>
      )}

      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] md:grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-8 w-full max-w-page-max-width my-0 mx-auto">
        {loading
          ? Array(10)
              .fill(null)
              .map((_, index) => <ComponentItemSkeleton key={index} />)
          : components.map((component) => (
              <ComponentItem key={component.id} {...component} />
            ))}
      </section>
    </section>
  );
}
