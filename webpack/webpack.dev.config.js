const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader'
          },
        ]
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
      }, {
        test: /\.(less|css)$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
  output: {
    path: parentDir + './dist',
    filename: 'bundle.js',
    publicPath: "/"
  },
  devServer: {
    contentBase: parentDir + './dist',
    historyApiFallback: true
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".js", ".json", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      title: 'Plan your binge!',
      showErrors: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: parentDir +  './src/style/bootstrap.mui.css', to: parentDir + './dist' }
      ],
    }),
    new webpack.DefinePlugin({
      ['process.env.API_HOST']: JSON.stringify("https://planmybinge.com/api"),
      ['process.env.SSR']: false
    })
  ]
};