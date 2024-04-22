/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./src/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {},
};
export const plugins = [];
export const safelist = [
  {
    pattern: /bg-(red|green|blue)-(100|200|300|400|500)/,
  },
];
