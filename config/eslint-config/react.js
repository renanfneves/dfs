/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ['@rocketseat/eslint-config/react'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'no-useless-constructor': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
