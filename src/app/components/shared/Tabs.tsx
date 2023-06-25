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
  const [visibleTabId, setVisibleTabId] = useState<TabId>(items[0].id);

  return (
    <section>
      <nav>
        <menu className="flex items-center gap-2">
          {items.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => setVisibleTabId(id)}
                className={`${
                  visibleTabId === id ? "bg-slate-800" : "bg-slate-900"
                } py-2 px-4 transition-colors rounded-none rounded-tl-md rounded-tr-md`}
              >
                {label}
              </button>
            </li>
          ))}
        </menu>
      </nav>

      <div className="flex flex-col gap-2 shadow-md bg-slate-800 p-4 rounded-md rounded-tl-none">
        {items.map(({ element, id }) => (
          <article key={id} className={id === visibleTabId ? "" : "hidden"}>
            {element}
          </article>
        ))}
      </div>
    </section>
  );
}
// focus:ring ring-blue-400
