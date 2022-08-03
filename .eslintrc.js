module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  plugins: [
    'react-hooks'
  ],
  rules: {
    'react-hooks/exhaustive-deps': ['warn', {
      'additionalHooks': '(useEffectAfterQueryReady)'
    }],
    'no-console': 'off',
    // eslint 的 no-unused-vars 不能正确识别 ts 语法
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],

    // https://stackoverflow.com/questions/63961803/eslint-says-all-enums-in-typescript-app-are-already-declared-in-the-upper-scope
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],

    // tsc 会检查, 无需 lint
    'no-dupe-class-members': 'off',

    'import/prefer-default-export': 'off',

    'import/extensions': 'off',

    // coding style
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'comma-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'operator-linebreak': 'off',
  },
  settings: {
    react: {
      'version': 'detect',
    },
  },
}
