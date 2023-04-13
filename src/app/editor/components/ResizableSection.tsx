// this component is inspired in [THIS CODEPEN](https://codepen.io/1isten/pen/mdVNqvK)
// I refactored it to use React and Typescript

"use client";

import { useRef, Children, useEffect, useState } from "react";

type Props = {
  children: React.ReactElement[];
  desktopLayout?: "rows" | "columns";
};

const RESIZABLE_SECTION_MIN_SIZE = 100;
const MOBILE_MEDIA_QUERY = "(max-width: 1024px)";
// const MIN_RESIZABLE_SECTION_WIDTH = 300;
// const MIN_RESIZABLE_SECTION_HEIGHT = 300;

export function ResizableSection({
  children,
  desktopLayout = "columns",
}: Props) {
  const [layout, setLayout] = useState(desktopLayout);
  const resizerX = useRef<HTMLDivElement>(null);
  const resizerY = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);
  const aboveSideRef = useRef<HTMLDivElement>(null);
  const belowSideRef = useRef<HTMLDivElement>(null);
  const clientXRef = useRef<number | null>(0);
  const clientYRef = useRef<number | null>(0);

  useEffect(() => {
    const updateLayoutOnDesktop = () => {
      const isMobileScreen = window.matchMedia(MOBILE_MEDIA_QUERY).matches;

      setLayout(isMobileScreen ? "rows" : desktopLayout);
    };

    updateLayoutOnDesktop();

    window.addEventListener("resize", updateLayoutOnDesktop);

    return () => window.removeEventListener("resize", updateLayoutOnDesktop);
  }, [setLayout, desktopLayout]);

  // for mobile
  function handleTouchStart(e: React.TouchEvent) {
    e.preventDefault();
    resizerX.current?.addEventListener("touchmove", handleTouchMove);
    resizerX.current?.addEventListener("touchend", handleTouchEnd);
  }
  function handleTouchMove(e: TouchEvent) {
    e.preventDefault();

    if (resizerX.current && leftSideRef.current && rightSideRef.current) {
      const clientX = e.touches[0].clientX;
      const deltaX = clientX - (clientXRef.current || clientX);
      clientXRef.current = clientX;

      if (deltaX < 0) {
        const w = Math.round(
          parseInt(getComputedStyle(leftSideRef.current).width) + deltaX
        );

        // if (w <= MIN_RESIZABLE_SECTION_WIDTH) return;
        leftSideRef.current.style.flex = `0 ${
          w < RESIZABLE_SECTION_MIN_SIZE ? 0 : w
        }px`;
        rightSideRef.current.style.flex = "1 0";
      }
      // RIGHT
      if (deltaX > 0) {
        const w = Math.round(
          parseInt(getComputedStyle(rightSideRef.current).width) - deltaX
        );

        // if (w <= MIN_RESIZABLE_SECTION_WIDTH) return;
        rightSideRef.current.style.flex = `0 ${
          w < RESIZABLE_SECTION_MIN_SIZE ? 0 : w
        }px`;
        leftSideRef.current.style.flex = "1 0";
      }
    }
    if (resizerY.current && aboveSideRef.current && belowSideRef.current) {
      const clientY = e.touches[0].clientY;
      const deltaY = clientY - (clientYRef.current || clientY);
      clientYRef.current = clientY;

      // UP
      if (deltaY < 0) {
        const h = Math.round(
          parseInt(getComputedStyle(aboveSideRef.current).height) + deltaY
        );

        // if (h <= MIN_RESIZABLE_SECTION_HEIGHT) return;

        aboveSideRef.current.style.flex = `0 ${
          h < RESIZABLE_SECTION_MIN_SIZE ? 0 : h
        }px`;
        belowSideRef.current.style.flex = "1 0";
      }
      // DOWN
      if (deltaY > 0) {
        const h = Math.round(
          parseInt(getComputedStyle(belowSideRef.current).height) - deltaY
        );

        // if (h <= MIN_RESIZABLE_SECTION_HEIGHT) return;

        belowSideRef.current.style.flex = `0 ${
          h < RESIZABLE_SECTION_MIN_SIZE ? 0 : h
        }px`;
        aboveSideRef.current.style.flex = "1 0";
      }
    }
  }
  function handleTouchEnd(e: TouchEvent) {
    e.preventDefault();
    resizerX.current?.removeEventListener("touchmove", handleTouchMove);
    resizerX.current?.removeEventListener("touchend", handleTouchEnd);
    clientXRef.current = null;
    clientYRef.current = null;
  }

  // for desktop
  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }
  function handleMouseMove(e: MouseEvent) {
    e.preventDefault();

    if (resizerX.current && leftSideRef.current && rightSideRef.current) {
      const clientX = e.clientX;
      const deltaX = clientX - (clientXRef.current || clientX);
      clientXRef.current = clientX;

      if (deltaX < 0) {
        const w = Math.round(
          parseInt(getComputedStyle(leftSideRef.current).width) + deltaX
        );

        // if (w <= MIN_RESIZABLE_SECTION_WIDTH) return;

        leftSideRef.current.style.flex = `0 ${
          w < RESIZABLE_SECTION_MIN_SIZE ? 0 : w
        }px`;
        rightSideRef.current.style.flex = "1 0";
      }

      // RIGHT
      if (deltaX > 0) {
        const w = Math.round(
          parseInt(getComputedStyle(rightSideRef.current).width) - deltaX
        );

        // if (w <= MIN_RESIZABLE_SECTION_WIDTH) return;

        rightSideRef.current.style.flex = `0 ${
          w < RESIZABLE_SECTION_MIN_SIZE ? 0 : w
        }px`;
        leftSideRef.current.style.flex = "1 0";
      }
    }
    if (resizerY.current && aboveSideRef.current && belowSideRef.current) {
      const clientY = e.clientY;
      const deltaY = clientY - (clientYRef.current || clientY);
      clientYRef.current = clientY;

      // UP
      if (deltaY < 0) {
        const h = Math.round(
          parseInt(getComputedStyle(aboveSideRef.current).height) + deltaY
        );

        // if (h <= MIN_RESIZABLE_SECTION_HEIGHT) return;

        aboveSideRef.current.style.flex = `0 ${
          h < RESIZABLE_SECTION_MIN_SIZE ? 0 : h
        }px`;
        belowSideRef.current.style.flex = "1 0";
      }
      // DOWN
      if (deltaY > 0) {
        const h = Math.round(
          parseInt(getComputedStyle(belowSideRef.current).height) - deltaY
        );

        // if (h <= MIN_RESIZABLE_SECTION_HEIGHT) return;

        belowSideRef.current.style.flex = `0 ${
          h < RESIZABLE_SECTION_MIN_SIZE ? 0 : h
        }px`;
        aboveSideRef.current.style.flex = "1 0";
      }
    }
  }
  function handleMouseUp(e: MouseEvent) {
    e.preventDefault();
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    clientXRef.current = null;
    clientYRef.current = null;
  }

  return (
    <section className="h-full flex overflow-hidden max-w-[100vw]">
      {layout === "rows" ? (
        <div className="flex max-w-[100vw] flex-col flex-1 h-full">
          <div ref={aboveSideRef} className="h-full overflow-hidden">
            {Children.map(
              children,
              (child) =>
                (typeof child.type === "string"
                  ? child.type
                  : child.type.name) === ResizableLeftSide.name && child
            )}
          </div>

          <div
            ref={resizerY}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="flex flex-col gap-1 h-[1.8rem] w-full justify-center items-center bg-black p-0 z-[2] cursor-row-resize"
          >
            <span className="w-6 h-[2px] bg-white" />
            <span className="w-6 h-[2px] bg-white" />
          </div>

          <div ref={belowSideRef} className="h-full overflow-hidden">
            {Children.map(
              children,
              (child) =>
                (typeof child.type === "string"
                  ? child.type
                  : child.type.name) === ResizableRightSide.name && child
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-row flex-1 w-full">
          <div ref={leftSideRef} className="w-full max-w-full overflow-hidden">
            {Children.map(
              children,
              (child) =>
                (typeof child.type === "string"
                  ? child.type
                  : child.type.name) === ResizableLeftSide.name && child
            )}
          </div>

          <div
            ref={resizerX}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="flex flex-grow-0 flex-row gap-1 w-[1.8rem] h-full justify-center items-center bg-black p-0 z-[2] cursor-col-resize"
          >
            <span className="w-[2px] h-6 bg-white" />
            <span className="w-[2px] h-6 bg-white" />
          </div>

          <div ref={rightSideRef} className="w-full max-w-full overflow-hidden">
            {Children.map(
              children,
              (child) =>
                (typeof child.type === "string"
                  ? child.type
                  : child.type.name) === ResizableRightSide.name && child
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const ResizableLeftSide: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <>{children}</>;

const ResizableRightSide: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <>{children}</>;

ResizableSection.LeftSide = ResizableLeftSide;
ResizableSection.RightSide = ResizableRightSide;
