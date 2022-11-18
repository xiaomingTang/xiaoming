/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        screen: 'calc(var(--vh, 1vh)*100)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
