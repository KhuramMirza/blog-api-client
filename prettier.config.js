// prettier.config.js
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  // Point this to your actual Tailwind v4 entry CSS file
  tailwindAttributes: ["className", "clsx", "class"],
  tailwindStylesheet: "./src/index.css",
};
