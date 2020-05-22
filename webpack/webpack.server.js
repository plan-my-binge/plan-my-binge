const path = require('path');
const nodeExternals = require('webpack-node-externals');
var parentDir = path.join(__dirname, '../');

module.exports = {
  entry: './server.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('dist'),
    filename: 'server.js'
  },

  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(parentDir, './src')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ]
      }    ]
  }
};