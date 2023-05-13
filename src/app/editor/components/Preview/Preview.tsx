// CREDITS:
// MOST OF THIS COMPONENT COMES FROM THIS CODESANDBOX
// https://codesandbox.io/s/tailwind-css-playground-kkkzc

import { useEffect, useState, useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { getPointerPosition } from "@/utils/get-pointer-position";
import { TailwindScript } from "@/app/components/shared/TailwindScript";
import {
  IconResizeBottom,
  IconResizeBottomLeft,
  IconResizeBottomRight,
  IconResizeLeft,
  IconResizeRight,
} from "@/app/editor/components/Preview/ResizeIcons";
import { Resizer } from "@/app/editor/components/Preview/Resizer";
import { Size } from "@/app/editor/types";
import { constrainSize } from "@/utils/constrain-size";

const DEFAULT_RESPONSIVE_SIZE = { width: 540, height: 720 };

type Props = {
  code: string;
  isResizable?: boolean;
};

export const Preview = ({ code, isResizable: a = false }: Props) => {
  const [isResizable, setIsResizable] = useState(a);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  const [resizing, setResizing] = useState<{
    direction: "bottom" | "left" | "right" | "bottom-left" | "bottom-right";
    startWidth: number;
    startHeight: number;
    startX: number;
    startY: number;
  } | null>(null);

  const timeout = useRef<number | null>(null);
  const [responsiveSize, setResponsiveSize] = useState(DEFAULT_RESPONSIVE_SIZE);
  const constrainedResponsiveSize = constrainSize({
    desiredHeight: responsiveSize.height,
    desiredWidth: responsiveSize.width,
    size,
  });

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (timeout.current) window.clearTimeout(timeout.current);
      const rect = containerRef.current?.getBoundingClientRect() ?? {
        width: 0,
        height: 0,
      };

      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      setSize({
        width,
        height,
      });
      timeout.current = window.setTimeout(() => {
        setSize((size) => ({ ...size, visible: false }));
      }, 1000);
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (size.width > 50 && size.height > 50) {
      setResponsiveSize(({ width, height }) => ({ width, height }));
    }

    if (resizing) {
      const onMouseMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        const { x, y } = getPointerPosition(e) ?? {
          x: 0,
          y: 0,
        };
        if (resizing.direction === "bottom") {
          setResponsiveSize(({ width }) => ({
            width,
            height: resizing.startHeight + (y - resizing.startY),
          }));
        } else if (resizing.direction === "left") {
          setResponsiveSize(({ height }) => ({
            width: resizing.startWidth - (x - resizing.startX) * 2,
            height,
          }));
        } else if (resizing.direction === "right") {
          setResponsiveSize(({ height }) => ({
            width: resizing.startWidth + (x - resizing.startX) * 2,
            height,
          }));
        } else if (resizing.direction === "bottom-left") {
          setResponsiveSize(() => ({
            width: resizing.startWidth - (x - resizing.startX) * 2,
            height: resizing.startHeight + (y - resizing.startY),
          }));
        } else if (resizing.direction === "bottom-right") {
          setResponsiveSize(() => ({
            width: resizing.startWidth + (x - resizing.startX) * 2,
            height: resizing.startHeight + (y - resizing.startY),
          }));
        }
      };
      const onMouseUp = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        setResizing(null);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      window.addEventListener("touchmove", onMouseMove);
      window.addEventListener("touchend", onMouseUp);
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("touchmove", onMouseMove);
        window.removeEventListener("touchend", onMouseUp);
      };
    }
  }, [resizing, size]);

  const dragFromLeft = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPointerPosition(e);
    if (pos === null) return;
    e.preventDefault();
    setResizing({
      direction: "left",
      startWidth: constrainedResponsiveSize.width,
      startHeight: 0,
      startX: pos.x,
      startY: 0,
    });
  };

  const dragFromRight = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPointerPosition(e);
    if (pos === null) return;
    e.preventDefault();
    setResizing({
      direction: "right",
      startWidth: constrainedResponsiveSize.width,
      startHeight: 0,
      startX: pos.x,
      startY: 0,
    });
  };

  const dragFromBottomLeft = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPointerPosition(e);
    if (pos === null) return;
    e.preventDefault();
    setResizing({
      direction: "bottom-left",
      startWidth: constrainedResponsiveSize.width,
      startHeight: constrainedResponsiveSize.height,
      startX: pos.x,
      startY: pos.y,
    });
  };

  const dragFromBottom = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPointerPosition(e);
    if (pos === null) return;
    e.preventDefault();
    setResizing({
      direction: "bottom",
      startWidth: 0,
      startHeight: constrainedResponsiveSize.height,
      startY: pos.y,
      startX: 0,
    });
  };

  const dragFromBottomRight = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getPointerPosition(e);
    if (pos === null) return;
    e.preventDefault();
    setResizing({
      direction: "bottom-right",
      startWidth: constrainedResponsiveSize.width,
      startHeight: constrainedResponsiveSize.height,
      startX: pos.x,
      startY: pos.y,
    });
  };

  return (
    <section
      className="h-full w-full inset-0 flex flex-col border-t border-gray-200 dark:border-white/10 lg:border-0 bg-gray-50 dark:bg-black relative"
      ref={containerRef}
    >
      <TailwindScript />

      {isResizable && (
        <div className="flex-none text-center text-xs leading-4 tabular-nums whitespace-pre py-3 text-gray-900 dark:text-gray-400">
          {constrainedResponsiveSize.width}
          {"  "}×{"  "}
          {constrainedResponsiveSize.height}
          {"  "}
          <span className="text-gray-500">
            ({Math.round(constrainedResponsiveSize.zoom * 100)}
            %)
          </span>
        </div>
      )}
      <div
        className="flex-auto grid justify-center"
        style={
          isResizable
            ? {
                gridTemplateColumns: "1.0625rem min-content 1.0625rem",
                gridTemplateRows: "min-content 1.0625rem",
              }
            : { gridTemplateColumns: "100%" }
        }
      >
        {isResizable && (
          <span
            className="cursor-ew-resize select-none bg-black dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center"
            onMouseDown={dragFromLeft}
            onTouchStart={dragFromLeft}
          >
            <IconResizeLeft />
          </span>
        )}
        <div
          className={`relative ${
            isResizable
              ? "border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden"
              : ""
          }`}
          style={
            isResizable
              ? {
                  width: Math.round(
                    constrainedResponsiveSize.width *
                      constrainedResponsiveSize.zoom
                  ),
                  height: Math.round(
                    constrainedResponsiveSize.height *
                      constrainedResponsiveSize.zoom
                  ),
                }
              : {}
          }
        >
          <div
            dangerouslySetInnerHTML={{ __html: code }}
            style={
              isResizable
                ? {
                    width: constrainedResponsiveSize.width,
                    height: constrainedResponsiveSize.height,
                    marginLeft:
                      (constrainedResponsiveSize.width -
                        Math.round(
                          constrainedResponsiveSize.width *
                            constrainedResponsiveSize.zoom
                        )) /
                      -2,
                    transformOrigin: "top",
                    transform: `scale(${constrainedResponsiveSize.zoom})`,
                  }
                : {}
            }
            className={`flex items-center justify-center w-full relative h-full overflow-auto bg-white text-dimmed-black ![&_img]:inline-block inset-0 ${
              resizing ? "pointer-events-none select-none" : ""
            }`}
          />
        </div>
        {isResizable && (
          <>
            <Resizer className="cursor-ew-resize" resizeHandler={dragFromRight}>
              <IconResizeRight />
            </Resizer>
            <Resizer
              className="cursor-nesw-resize"
              resizeHandler={dragFromBottomLeft}
            >
              <IconResizeBottomLeft />
            </Resizer>
            <Resizer
              className="cursor-ns-resize"
              resizeHandler={dragFromBottom}
            >
              <IconResizeBottom />
            </Resizer>
            <Resizer
              className="cursor-nwse-resize"
              resizeHandler={dragFromBottomRight}
            >
              <IconResizeBottomRight />
            </Resizer>
          </>
        )}
      </div>
      <button
        type="button"
        className="absolute "
        onClick={() => setIsResizable((current) => !current)}
      >
        Is Resizable: {isResizable ? "true" : "false"}
      </button>
    </section>
  );
};
