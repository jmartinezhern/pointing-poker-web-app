const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const path = require('path')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
      happyPackMode: true,
      transpileOnly: true,
    },
  })
  config.resolve.extensions.push('.ts', '.tsx')

  config.resolve.plugins = config.resolve.plugins || []
  config.resolve.plugins.push(
    new TsconfigPathsPlugin({
      configFile: path.join(__dirname, '../tsconfig.json'),
    })
  )

  return config
}
