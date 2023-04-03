/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "dimmed-dark": "var(--dimmed-black)",
      },
      maxWidth: {
        "page-max-width": "var(--page-max-width)",
      },
    },
  },
  plugins: [],
};
