import { Database } from "@/types/db";
import { ComponentItem } from "./ComponentItem/ComponentItem";
import { Search } from "@/app/components/shared/Search/Search";

type Props = {
  defaultComponents: Array<Database["public"]["Tables"]["components"]["Row"]>;
};

export function ComponentsList({ defaultComponents }: Props) {
  return (
    <section className="flex flex-col gap-8 py-20 px-2 md:px-4 bg-dimmed-black">
      <Search />
      <section className="grid grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] md:grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-8 w-full max-w-page-max-width my-0 mx-auto">
        {defaultComponents.map((component) => (
          <ComponentItem key={component.id} {...component} />
        ))}
      </section>
    </section>
  );
}
