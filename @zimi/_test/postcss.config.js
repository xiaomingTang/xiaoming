module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env'),
  ],
}
