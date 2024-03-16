const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin'); // integrate ESLint to build process
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); // for synchronous type checking

// load environment variables from the .env file
const envResult = dotenv.config();

// check if loading environment variables was successful
if (envResult.error) {
  throw envResult.error;
}

module.exports = {
  entry: path.resolve(__dirname, '.', 'src/index.tsx'),
  resolve: {
    modules: [path.resolve(__dirname, '.', 'src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@services': path.resolve(__dirname, '.', 'src/services'),
      '@configs': path.resolve(__dirname, '.', 'src/configs'),
      '@interfaces': path.resolve(__dirname, '.', 'src/types'),
      '@utils': path.resolve(__dirname, '.', 'src/utils'),
      '@pages': path.resolve(__dirname, '.', 'src/pages'),
      '@components': path.resolve(__dirname, '.', 'src/components'),
      '@assets': path.resolve(__dirname, '.', 'src/assets'),
      '@api': path.resolve(__dirname, '.', 'src/api'),
      '@redux': path.resolve(__dirname, '.', 'src/redux'),
      '@hooks': path.resolve(__dirname, '.', 'src/hooks'),
      // Add more aliases as needed...
    },
  },
  module: {
    rules: [
      // webpack should use `babel-loader` for all mentioned file types
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jpe?g|gif|svg)$/i,
        loader: 'file-loader', // Use file-loader for handling images
        options: {
          name: 'static/[name].[hash].[ext]', // Output images to static folder with hash in filename
        },
      },
      {
        test: /\.woff(2)?(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        use: [
          {
            loader: 'file-loader', // Fallback to file-loader for larger files
            options: {
              name: 'static/[name].[hash].[ext]', // Output fonts to static folder with hash in filename
            },
          },
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // Inline files smaller than 10KB
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        loader: 'file-loader', // Use file-loader for handling fonts
        options: {
          name: 'static/[name].[hash].[ext]', // Output fonts to static folder with hash in filename
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
  output: {
    // bundled code should be in
    path: path.resolve(__dirname, '.', './build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new ESLintPlugin({
      exclude: ['node_modules'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '.', 'public/index.html'),
      filename: 'index.html',
      title: 'MERN AUTH',
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyURLs: true,
        minifyJS: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(envResult.parsed),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  stats: 'errors-only',
  mode: process.env.MODE || 'development',
};
