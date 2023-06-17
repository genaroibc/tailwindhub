type Props = {
  className?: string;
  children?: React.ReactNode;
  resizerRef?: React.LegacyRef<HTMLDivElement>;
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  onTouchStart: React.TouchEventHandler<HTMLDivElement>;
};

export function Resizer({
  children,
  className,
  onMouseDown,
  onTouchStart,
  resizerRef,
}: Props) {
  return (
    <div
      ref={resizerRef}
      className={`${className} select-none bg-black dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center`}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {children}
    </div>
  );
}
