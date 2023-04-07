"use client";

import { useRef } from "react";

type Props = {
  textToCopy: string;
  likes: number;
  downloads: number;
};

export function ComponentItemNavBar({ textToCopy, downloads, likes }: Props) {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(textToCopy);
    const image = imageRef.current;

    if (image) {
      image.src = "/svg/done.svg";
      setTimeout(() => {
        image.src = "/svg/copy.svg";
      }, 2000);
    }
  };

  return (
    <nav className="flex flex-wrap justify-end gap-2 align-center">
      <button
        className="flex place-items-center gap-1 p-3 bg-secondary-color hover:bg-tertiary-color"
        onClick={handleCopyCode}
      >
        <img
          ref={imageRef}
          alt="Copy code"
          src="/svg/copy.svg"
          width={20}
          height={20}
        />
        {downloads}
      </button>
      <button className="flex place-items-center gap-1 p-3 bg-secondary-color hover:bg-tertiary-color">
        <img alt="Like" src="/svg/heart-outlined.svg" width={20} height={20} />
        {likes}
      </button>
    </nav>
  );
}
