module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['react', 'react-hooks', 'tailwindcss', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier',
    'plugin:tailwindcss/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/no-custom-classname': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': [
      'warn',
      {
        allowNullableObject: true,
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      2,
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'off',
    'no-callback-literal': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
  },
};
