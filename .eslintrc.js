module.exports = {
  extends: ['semistandard', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'space-before-function-paren': ['error', 'never']
  },
  env: {
    jest: true
  }
};
