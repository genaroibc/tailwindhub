"use client";

import { Preview } from "@/app/editor/components/Preview/Preview";

type Props = {
  code: string;
};

export function ComponentPreview({ code }: Props) {
  return (
    <div className="py-4 mt-12">
      <Preview code={code} isResizable={false} />
    </div>
  );
}
