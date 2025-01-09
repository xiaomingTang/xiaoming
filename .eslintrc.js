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
    project: ['./tsconfig.json', './tsconfig.node.json']
  },
  rules: {
    'no-console': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    // tsc 会检查, 无需 lint
    'no-dupe-class-members': 'off',
    'import/prefer-default-export': 'off',
    'no-void': ['warn', {
      allowAsStatement: true,
    }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-floating-promises': 'warn',
  },
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
