/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '640px', // => @media (min-width: 640px) { ... }
        'desktop': '1024px', // => @media (min-width: 1024px) { ... }
      },
      height: {
        screen: 'calc(var(--vh, 1vh)*100)',
      },
      minHeight: {
        screen: 'calc(var(--vh, 1vh)*100)',
      },
      maxHeight: {
        screen: 'calc(var(--vh, 1vh)*100)',
      },
      colors: {
        primary: {
          100: 'rgba(36, 116, 181, 0.1)',
          200: 'rgba(36, 116, 181, 0.2)',
          300: 'rgba(36, 116, 181, 0.3)',
          400: 'rgba(36, 116, 181, 0.4)',
          500: 'rgba(36, 116, 181, 0.5)',
          600: 'rgba(36, 116, 181, 0.6)',
          700: 'rgba(36, 116, 181, 0.7)',
          800: 'rgba(36, 116, 181, 0.8)',
          900: 'rgba(36, 116, 181, 0.9)',
        },
        b: {
          100: 'rgba(28, 13, 26, 0.1)',
          200: 'rgba(28, 13, 26, 0.2)',
          300: 'rgba(28, 13, 26, 0.3)',
          400: 'rgba(28, 13, 26, 0.4)',
          500: 'rgba(28, 13, 26, 0.5)',
          600: 'rgba(28, 13, 26, 0.6)',
          700: 'rgba(28, 13, 26, 0.7)',
          800: 'rgba(28, 13, 26, 0.8)',
          900: 'rgba(28, 13, 26, 0.9)',
        },
        w: {
          100: 'rgba(233, 215, 223, 0.1)',
          200: 'rgba(233, 215, 223, 0.2)',
          300: 'rgba(233, 215, 223, 0.3)',
          400: 'rgba(233, 215, 223, 0.4)',
          500: 'rgba(233, 215, 223, 0.5)',
          600: 'rgba(233, 215, 223, 0.6)',
          700: 'rgba(233, 215, 223, 0.7)',
          800: 'rgba(233, 215, 223, 0.8)',
          900: 'rgba(233, 215, 223, 0.9)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
