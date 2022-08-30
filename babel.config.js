module.exports = function(api) {
  api.cache(false);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      'react-native-reanimated/plugin',
      ["module-resolver", {
      "root": [
        "./app"
      ],
      "extensions": [
        ".ios.js",
        ".android.js",
        ".ts",
        ".tsx",
        ".js",
        ".json"
      ],
      "alias": {
        "@components": "./app",
      }
    }]
  ],
  }
}
