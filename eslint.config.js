import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';

export default tseslint.config(
  { ignores: ['dist', 'eslint.config.js'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'off',
      // Disable React 19 Compiler-level strict rules for existing codebase patterns
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/incompatible-library': 'off',
    },
  },
  // Node.js config files (not TypeScript)
  {
    files: ['**/*.{js,mjs,cjs}', 'scripts/**/*.ts'],
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // Storybook
  ...storybook.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['**/*.stories.tsx'],
    rules: {
      ...config.rules,
      'storybook/no-renderer-packages': 'off',
    },
  })),
);
