module.exports = {
  root: true,
  extends: '@auvred',
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
}
