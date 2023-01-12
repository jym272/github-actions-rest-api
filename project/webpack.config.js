const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production' || process.env.CI;

module.exports = {
  target: 'node',
  mode: isProd ? 'production' : 'development',
  entry: slsw.lib.entries,
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
            path.resolve(__dirname, 'dist'),
            path.resolve(__dirname, 'tests')
          ]
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts']
  },
  externals: [nodeExternals()]
};
