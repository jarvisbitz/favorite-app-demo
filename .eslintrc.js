module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['**/*.js'],
      parserOptions: {
        requireConfigFile: false,
      },
    },
  ],
};
