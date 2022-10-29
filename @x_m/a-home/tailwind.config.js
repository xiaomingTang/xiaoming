/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Note the addition of the `app` directory.
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
