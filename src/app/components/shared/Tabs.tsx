"use client";

import React from "react";

import { useState } from "react";

type TabChild = React.ReactElement;

type Props = {
  children: TabChild[];
};

const filterInvalidChildren = (child: TabChild) =>
  child.props[LABEL_PROP_NAME] != null;

export function Tabs({ children }: Props) {
  const [visibleTab, setVisibleTab] = useState(0);

  return (
    <section>
      <nav>
        <menu className="flex items-center gap-2">
          {children.filter(filterInvalidChildren).map((child, i) => (
            <li key={i}>
              <button
                onClick={() => setVisibleTab(i)}
                className="py-2 px-4 bg-slate-700"
              >
                {child.props[LABEL_PROP_NAME]}
              </button>
            </li>
          ))}
        </menu>
      </nav>

      {children.filter(filterInvalidChildren).find((_, i) => i === visibleTab)}
    </section>
  );
}

const LABEL_PROP_NAME = "label";

type TabProps = {
  children: React.ReactNode;
  // eslint-disable-next-line react/no-unused-prop-types
  [LABEL_PROP_NAME]: React.ReactNode;
};

export function Tab({ children }: TabProps) {
  return <>{children}</>;
}
