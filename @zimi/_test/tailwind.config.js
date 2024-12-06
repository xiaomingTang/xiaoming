/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '640px', // => @media (min-width: 640px) { ... }
        'desktop': '1024px', // => @media (min-width: 1024px) { ... }
      },
      height: {
        screen: 'calc(max(var(--vh, 1vh), 1vh)*100)',
      },
      minHeight: {
        screen: 'calc(max(var(--vh, 1vh), 1vh)*100)',
      },
      maxHeight: {
        screen: 'calc(max(var(--vh, 1vh), 1vh)*100)',
      },
      zIndex: {
        header: 1000,
        pwaTip: 1000,
      },
      colors: {
        primary: {
          100: 'rgba(20, 74, 169, 0.1)',
          200: 'rgba(20, 74, 169, 0.2)',
          300: 'rgba(20, 74, 169, 0.3)',
          400: 'rgba(20, 74, 169, 0.4)',
          500: 'rgba(20, 74, 169, 0.5)',
          600: 'rgba(20, 74, 169, 0.6)',
          700: 'rgba(20, 74, 169, 0.7)',
          800: 'rgba(20, 74, 169, 0.8)',
          900: 'rgba(20, 74, 169, 0.9)',
          light: 'rgba(20, 74, 169, 0.7)',
          main: 'rgba(20, 74, 169, 0.8)',
          dark: 'rgba(20, 74, 169, 0.9)',
        },
        b: {
          100: 'rgba(28, 17, 27, 0.1)',
          200: 'rgba(28, 17, 27, 0.2)',
          300: 'rgba(28, 17, 27, 0.3)',
          400: 'rgba(28, 17, 27, 0.4)',
          500: 'rgba(28, 17, 27, 0.5)',
          600: 'rgba(28, 17, 27, 0.6)',
          700: 'rgba(28, 17, 27, 0.7)',
          800: 'rgba(28, 17, 27, 0.8)',
          900: 'rgba(28, 17, 27, 0.9)',
          light: 'rgba(28, 17, 27, 0.7)',
          main: 'rgba(28, 17, 27, 0.8)',
          dark: 'rgba(28, 17, 27, 0.9)',
        },
        w: {
          100: 'rgba(226, 225, 228, 0.1)',
          200: 'rgba(226, 225, 228, 0.2)',
          300: 'rgba(226, 225, 228, 0.3)',
          400: 'rgba(226, 225, 228, 0.4)',
          500: 'rgba(226, 225, 228, 0.5)',
          600: 'rgba(226, 225, 228, 0.6)',
          700: 'rgba(226, 225, 228, 0.7)',
          800: 'rgba(226, 225, 228, 0.8)',
          900: 'rgba(226, 225, 228, 0.9)',
          light: 'rgba(226, 225, 228, 0.7)',
          main: 'rgba(226, 225, 228, 0.8)',
          dark: 'rgba(226, 225, 228, 0.9)',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  // 覆盖了 mui 基础样式, 因此禁用
  // 在 src/styles 里面将 preflight.css 引入了进来并进行了定制
  corePlugins: {
    preflight: false,
  },
}
