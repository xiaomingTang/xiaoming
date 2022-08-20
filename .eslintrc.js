module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'plugin:react/recommended',
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


    // tsc 会检查, 无需 lint
    'no-dupe-class-members': 'off',

    'import/prefer-default-export': 'off',
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
