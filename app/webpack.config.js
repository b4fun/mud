const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  appBuild: resolveApp('build'),
  appNodeModules: resolveApp('node_modules'),
};

module.exports = {
  entry: {
    bundle: [resolveApp('src/main')],
  },
  output: {
    path: paths.appBuild,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['ts-loader'],
        exclude: [/node_modules/, paths.appNodeModules],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
    ],
  },
  externals: {
    // don't bundle the 'react' npm package with our bundle.js
    // but get it from a global 'React' variable
    // 'react': 'React'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets/hexagonTiles',
        to: 'hexagonTiles',
      },
      {
        from: './src/assets/hexagonPack',
        to: 'hexagonPack',
      },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.js'],

    // this is only required when we "import 'jquery'"
    // 'alias': { 'jquery': path.join(__dirname, "vendor", "jquery-2.2.0.min.js") }
  },
};
