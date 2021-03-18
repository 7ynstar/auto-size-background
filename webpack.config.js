const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'example/src/index.html'),
  filename: './index.html'
})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: path.join(__dirname, './example/src/index.jsx'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|ico|jpeg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: 'img',
            outputPath: 'img'
          }
        }]
      },
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@': resolve('src'),
      src: resolve('src'),
    }
  },
  devServer: {
    port: 3030,
    open: true,
  }
}