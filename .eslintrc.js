module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:node/recommended', 'plugin:promise/recommended'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['html', 'prettier', 'promise', 'react-hooks'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': [
      1,
      { forbid: ['any', 'array'], checkContextTypes: false, checkChildContextTypes: false },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['public/**/*.js', 'public/**/*.jsx'],
      rules: {
        'node/no-unsupported-features/es-syntax': 'off',
      },
    },
  ],
};
