const HtmlWebpackPlugin = require('html-webpack-plugin');

var webpack = require('webpack');
var path = require('path');

var parentDir = path.join(__dirname, '../');

module.exports = {
  mode: "development",
  entry: [
    path.join(parentDir, './src/index.js')
  ],
  module: {
    rules: [
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
      }, {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
  output: {
    path: parentDir + './dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: parentDir + './dist',
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      title: 'Plan your binge!',
      showErrors: true
    })
  ]
};