module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-unused-vars': 1,
    'comma-dangle': ['error', 'always-multiline'],
    quotes: [2, 'single'],
    'prefer-template': ['error'],
    'no-useless-concat': ['error'],
    'prefer-destructuring': ['error',
      {
        object: true,
      },
    ],
  },
}
