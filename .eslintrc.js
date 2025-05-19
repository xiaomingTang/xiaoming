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
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allowSingleOrDouble',
      },
    ],
    '@typescript-eslint/no-floating-promises': 'warn',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    '@typescript-eslint/no-var-requires': 'off',
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
