module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]]
    }
  })

  config.module.rules.push({
    test: /\.stories\.tsx$/,
    loader: '@storybook/source-loader',
    options: {
      prettierConfig: {
        jsxBracketSameLine: false,
        semi: false
      }
    },
    enforce: 'pre'
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
