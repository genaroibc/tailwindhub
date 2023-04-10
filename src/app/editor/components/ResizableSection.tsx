// this component is inspired in [THIS CODEPEN](https://codepen.io/1isten/pen/mdVNqvK)
// I refactored it to use React and Typescript

import { useRef, Children, HTMLAttributes } from "react";

interface Props
  extends React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  children: React.ReactElement[];
}

const MIN_RESIZABLE_SECTION_WIDTH = 300;
export function ResizableSection({ children }: Props) {
  const resizerX = useRef<HTMLDivElement>(null);
  const leftSideRef = useRef<HTMLDivElement>(null);
  const rightSideRef = useRef<HTMLDivElement>(null);

  const clientXRef = useRef<number | null>(0);

  // for mobile
  function handleTouchStart(e: React.TouchEvent) {
    e.preventDefault();
    resizerX.current?.addEventListener("touchmove", handleTouchMove);
    resizerX.current?.addEventListener("touchend", handleTouchEnd);
  }

  function handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (!resizerX.current || !leftSideRef.current || !rightSideRef.current)
      return;

    const clientX = e.touches[0].clientX;
    const deltaX = clientX - (clientXRef.current || clientX);
    clientXRef.current = clientX;

    if (deltaX < 0) {
      const w = Math.round(
        parseInt(getComputedStyle(leftSideRef.current).width) + deltaX
      );

      if (w <= MIN_RESIZABLE_SECTION_WIDTH) return;
      leftSideRef.current.style.flex = `0 ${w < 100 ? 0 : w}px`;
      rightSideRef.current.style.flex = "1 0";
    }
    // RIGHT
    if (deltaX > 0) {
      const w = Math.round(
        parseInt(getComputedStyle(rightSideRef.current).width) - deltaX
      );

      if (w <= MIN_RESIZABLE_SECTION_WIDTH) return;
      rightSideRef.current.style.flex = `0 ${w < 100 ? 0 : w}px`;
      leftSideRef.current.style.flex = "1 0";
    }
  }
  function handleTouchEnd(e: TouchEvent) {
    e.preventDefault();
    resizerX.current?.removeEventListener("touchmove", handleTouchMove);
    resizerX.current?.removeEventListener("touchend", handleTouchEnd);
    clientXRef.current = null;
  }

  // for desktop
  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }
  function handleMouseMove(e: MouseEvent) {
    e.preventDefault();
    if (!resizerX.current || !leftSideRef.current || !rightSideRef.current)
      return;

    const clientX = e.clientX;
    const deltaX = clientX - (clientXRef.current || clientX);
    clientXRef.current = clientX;

    if (deltaX < 0) {
      const w = Math.round(
        parseInt(getComputedStyle(leftSideRef.current).width) + deltaX
      );

      if (w <= MIN_RESIZABLE_SECTION_WIDTH) return;

      leftSideRef.current.style.flex = `0 ${w < 100 ? 0 : w}px`;
      rightSideRef.current.style.flex = "1 0";
    }
    // RIGHT
    if (deltaX > 0) {
      const w = Math.round(
        parseInt(getComputedStyle(rightSideRef.current).width) - deltaX
      );

      if (w <= MIN_RESIZABLE_SECTION_WIDTH) return;

      rightSideRef.current.style.flex = `0 ${w < 100 ? 0 : w}px`;
      leftSideRef.current.style.flex = "1 0";
    }
  }
  function handleMouseUp(e: MouseEvent) {
    e.preventDefault();
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    clientXRef.current = null;
  }

  return (
    <section className="h-full flex overflow-hidden">
      <div ref={leftSideRef} className="w-full max-w-full overflow-hidden">
        {Children.map(
          children,
          (child) =>
            (typeof child.type === "string" ? child.type : child.type.name) ===
              ResizableLeftSide.name && child
        )}
      </div>

      <div
        ref={resizerX}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative flex w-6 justify-center items-center bg-black p-1 z-[2] cursor-col-resize before:content-[''] before:w-[2px] before:h-4 before:m-[2px] before:bg-gray-200 after:content-[''] after:w-[2px] after:h-4 after:m-[2px] after:bg-gray-200"
      />

      <div ref={rightSideRef} className="w-full max-w-full overflow-hidden">
        {Children.map(
          children,
          (child) =>
            (typeof child.type === "string" ? child.type : child.type.name) ===
              ResizableRightSide.name && child
        )}
      </div>
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
