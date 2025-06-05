// ESLint flat config
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    ignores: ['dist/**', 'node_modules/**', 'vite.config.ts'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'unused-imports': unusedImportsPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        // Removemos o project para evitar problemas com o TypeScript
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // Prettier and formatting
      'prettier/prettier': 'error',
      quotes: ['error', 'single'],
      'padding-line-between-statements': [
        'warn',
        { blankLine: 'always', prev: 'function', next: '*' },
        { blankLine: 'always', prev: '*', next: 'if' },
        { blankLine: 'always', prev: 'if', next: '*' },
        { blankLine: 'always', prev: '*', next: 'function' },
      ],
      'max-len': 'off',
      indent: 'off',
      'arrow-parens': 'off',
      'object-curly-newline': 'off',
      'operator-linebreak': 'off',
      'implicit-arrow-linebreak': 'off',
      'function-paren-newline': 'off',
      'no-confusing-arrow': 'off',
      'no-tabs': 'off',

      // General
      'no-console': ['error', { allow: ['error'] }],
      'no-param-reassign': 'off',
      'no-shadow': 'off',
      'no-use-before-define': 'off',
      'no-underscore-dangle': 'off',
      'no-nested-ternary': 'off',
      'consistent-return': 'off',
      'class-methods-use-this': 'off',
      'no-useless-constructor': 'off',
      camelcase: 'off',

      // Import rules
      'import/prefer-default-export': 'off',
      'import/no-cycle': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/default': 'off',
      'import/no-unresolved': 'off',
      'import/extensions': 'off',
      'import/no-import-module-exports': 'off',
      'import/no-extraneous-dependencies': 'off',
      'no-restricted-exports': ['off', { restrictedNamedExports: ['default'] }],

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Unused imports
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-indent': 'off',
      'react/jsx-indent-props': 'off',
      'react/jsx-wrap-multilines': 'off',
      'react/require-default-props': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-no-bind': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-array-index-key': 'off',
      'react/jsx-pascal-case': 'off',
      'react-refresh/only-export-components': 'warn',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  prettierConfig,
];
