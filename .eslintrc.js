module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'prettier',
  ],
  plugins: [
    'react-hooks'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'no-console': 'off',
    'react-hooks/exhaustive-deps': 'warn',

    // tsc 会检查, 无需 lint
    'no-dupe-class-members': 'off',

    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['@x_m/a-home/**/*'],
      extends: [
        'eslint:recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript/base',
        'next/core-web-vitals',
        'prettier',
      ],
      settings: {
        next: {
          rootDir: '@x_m/a-home'
        },
        "import/resolver": {
          alias: {
            map: [
              ['@', '@x_m/a-home/src'],
              ['@ROOT', '@x_m/a-home'],
            ],
          },
        }
      },
      rules: {
        'no-console': 'off',
        'react-hooks/exhaustive-deps': 'warn',
    
        // tsc 会检查, 无需 lint
        'no-dupe-class-members': 'off',
    
        'import/prefer-default-export': 'off',
        "import/extensions": [
           "off",
        ],
        "@next/next/no-html-link-for-pages": ["error", "@x_m/a-home/app/"]
      },
    },
    {
      files: ['@x_m/a-home/app/**/*.{md,mdx}'],
      extends: [
        'plugin:mdx/recommended',
      ],
      settings: {
        "mdx/code-blocks": true,
      }
    },
  ],
  settings: {
    react: {
      'version': 'detect',
    },
    "import/resolver": {
      "node": {
        "extensions": [
          ".ts",
          ".tsx"
        ]
      }
    }
  },
}
