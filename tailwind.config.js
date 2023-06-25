/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "dimmed-black": "var(--dimmed-black)",
        "dark-brown": "var(--dark-brown)",
        "light-brown": "var(--light-brown)",
        "tertiary-color": "var(--tertiary-color)",
        "tailwind-dark": "var(--tailwind-dark)",
        "tailwind-normal": "var(--tailwind-normal)",
      },
      maxWidth: {
        "page-max-width": "var(--page-max-width)",
      },
    },
  },
  plugins: [],
};
