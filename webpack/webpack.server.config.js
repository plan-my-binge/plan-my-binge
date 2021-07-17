const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpack = require('webpack');


const path = require('path');
const nodeExternals = require('webpack-node-externals');
var parentDir = path.join(__dirname, '../');

module.exports = {
  entry: './server.js',

  target: 'node',

  output: {
    path: path.resolve('dist'),
    filename: 'server.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader", // asks bundler to use babel loader to transpile es2015 code
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        },
        exclude: [/node_modules/, /public/]
      }, {
        test: /\.(less|css)$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ['process.env.API_HOST']: JSON.stringify("http://localhost:80"),
      ['process.env.SSR']: true
    })
  ]
};
