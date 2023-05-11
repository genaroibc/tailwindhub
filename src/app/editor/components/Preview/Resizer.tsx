type Props = {
  // eslint-disable-next-line no-unused-vars
  resizeHandler: (event: React.MouseEvent | React.TouchEvent) => void;
  className?: string;
  children?: React.ReactNode;
};

export function Resizer({
  resizeHandler,
  children,

  className,
}: Props) {
  return (
    <span
      className={`${className} select-none bg-black dark:bg-gray-800 text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-150 flex items-center justify-center`}
      onMouseDown={resizeHandler}
      onTouchStart={resizeHandler}
    >
      {children}
    </span>
  );
}
