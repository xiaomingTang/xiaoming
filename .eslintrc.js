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
      files: ['@zimi/www/**/*'],
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
          rootDir: '@zimi/www'
        },
        "import/resolver": {
          alias: {
            map: [
              ['@', '@zimi/www/src'],
              ['@ROOT', '@zimi/www'],
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
        "@next/next/no-html-link-for-pages": ["error", "@zimi/www/src/app/"]
      },
    },
    {
      files: ['@zimi/www/app/**/*.{md,mdx}'],
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
