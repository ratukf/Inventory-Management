import { defineConfig } from 'eslint/config';
import { node, es2021 } from 'globals';

export default defineConfig({
  files: ['**/*.{js,mjs}'],
  languageOptions: {
    globals: { ...node, ...es2021 },
    sourceType: 'module',
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
});
