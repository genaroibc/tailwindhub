"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./ComponentItemNavBar.module.css";

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
    <nav className={styles.item_navbar}>
      <button onClick={handleCopyCode}>
        <Image
          ref={imageRef}
          alt="Copy code"
          src="/svg/copy.svg"
          width={20}
          height={20}
        />
        {downloads}
      </button>
      <button>
        <Image
          alt="Like"
          src="/svg/heart-outlined.svg"
          width={20}
          height={20}
        />
        {likes}
      </button>
    </nav>
  );
}
