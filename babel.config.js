module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [["inline-import", { "extensions": [".sql"] }], "@babel/plugin-transform-template-literals", 'react-native-reanimated/plugin',],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
