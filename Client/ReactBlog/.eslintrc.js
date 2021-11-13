// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:cypress/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'cypress', 'prettier'],
  rules: {
    indent: ['error', 'tab', { SwitchCase: 1 }],
    'prettier/prettier': ['error'],
    'linebreak-style': ['error', 'windows'],
    quotes: [0, 'single'],
    semi: ['error', 'never'],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    'react/prop-types': 0,
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'none', ignoreRestSiblings: false },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
