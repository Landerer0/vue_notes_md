// .eslintrc.js
export default {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', '@vue/typescript/recommended'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-export-in-script-setup': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
  },
}
