type ButtonVariant = "solid" | "outlined" | "secondary";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: ButtonVariant;
}

const commonStyles =
  "py-2 px-4 border-2 transition-colors border-solid disabled:opacity-90 disabled:cursor-not-allowed flex flex-row gap-2 items-center justify-center";

const variantStyles: Record<ButtonVariant, string> = {
  solid:
    "bg-light-brown border-light-brown disabled:hover:bg-light-brown text-white hover:bg-dark-brown",
  outlined:
    "bg-transparent border-light-brown disabled:hover:bg-transparent text-dark-brown hover:border-dark-brown",
  secondary:
    "bg-secondary-color border-secondary-color disabled:hover:bg-secondary-color text-dimmed-black hover:bg-tertiary-color",
};

export function Button({ variant = "solid", className, ...props }: Props) {
  return (
    <button
      className={`${commonStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    ></button>
  );
}
