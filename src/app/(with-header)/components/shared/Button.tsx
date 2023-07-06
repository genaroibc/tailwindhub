type ButtonVariant = "solid" | "outlined" | "secondary";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: ButtonVariant;
}

const commonStyles =
  "py-1.5 px-3 border-2 transition-colors border-solid disabled:opacity-90 disabled:cursor-not-allowed flex flex-row gap-2 items-center justify-center";

const variantStyles: Record<ButtonVariant, string> = {
  solid:
    "bg-tailwind-dark border-tailwind-dark disabled:hover:bg-tailwind-dark text-white hover:bg-tailwind-normal",
  outlined:
    "bg-transparent border-tailwind-dark disabled:hover:bg-transparent text-tailwind-normal hover:border-tailwind-normal",
  secondary:
    "bg-secondary-color border-secondary-color disabled:hover:bg-secondary-color text-dimmed-black hover:bg-tertiary-color",
};

export function Button({ variant = "solid", className, ...props }: Props) {
  return (
    <button
      className={`${className} ${commonStyles} ${variantStyles[variant]}`}
      {...props}
    ></button>
  );
}
