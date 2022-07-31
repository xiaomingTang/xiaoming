// @TODO: storybook not working

module.exports = {
  "stories": ["../@xm/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  // https://storybook.js.org/docs/react/faq#how-do-i-setup-the-new-react-context-root-api-with-storybook
  // but not working, even getting worse
  // reactOptions: {
  //   legacyRootApi: true,
  // },
  // https://issuehunt.io/r/storybookjs/storybook/issues/15391
  // async viteFinal(config) {
  //   return {
  //     ...config,
  //     define: {
  //       ...config.define,
  //       global: "window",
  //     },
  //     esbuild: {
  //       ...config.esbuild,
  //       // jsxInject: `import React from 'react'`,
  //     },
  //   };
  // },
};
