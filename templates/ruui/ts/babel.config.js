module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          components: './src/components',
          screens: './src/screens',
          utils: './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}
