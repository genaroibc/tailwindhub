"use client";

import React from "react";

import { useState } from "react";

type TabId = string | number;

type Tab = {
  label: React.ReactNode;
  element: React.ReactNode;
  id: TabId;
};

type Props = {
  items: Tab[];
};

export function Tabs({ items }: Props) {
  const [visibleTab, setVisibleTab] = useState<TabId>(items[0].id);

  return (
    <section>
      <nav>
        <menu className="flex items-center gap-2">
          {items.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => setVisibleTab(id)}
                className="py-2 px-4 bg-slate-700"
              >
                {label}
              </button>
            </li>
          ))}
        </menu>
      </nav>

      {items.map(({ element, id }) => (
        <article key={id} className={id === visibleTab ? "" : "hidden"}>
          {element}
        </article>
      ))}
    </section>
  );
}
