"use client";

import {
  CopyIcon,
  DoneIcon,
  HeartOutlinedIcon,
} from "@/app/components/shared/Icons";
import { useEffect, useRef, useState } from "react";

type Props = {
  textToCopy: string;
  likes: number;
  downloads: number;
};

export function ComponentItemNavBar({ textToCopy, downloads, likes }: Props) {
  const [copied, setCopied] = useState(false);

  const imageRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!copied) return;

    const timeoutId = setTimeout(() => setCopied(false), 2000);

    return () => clearTimeout(timeoutId);
  }, [copied]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(textToCopy).then(() => setCopied(true));
  };

  return (
    <nav className="flex flex-wrap justify-end gap-2 align-center">
      <button
        className="flex place-items-center gap-1 p-3 bg-secondary-color hover:bg-tertiary-color"
        onClick={handleCopyCode}
      >
        {copied ? (
          <DoneIcon width={20} height={20} />
        ) : (
          <CopyIcon ref={imageRef} width={20} height={20} />
        )}
        {downloads}
      </button>
      <button className="flex place-items-center gap-1 p-3 bg-secondary-color hover:bg-tertiary-color">
        <HeartOutlinedIcon width={20} height={20} />
        {likes}
      </button>
    </nav>
  );
}
