const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'example/src/index.html'),
  filename: './index.html'
})

module.exports = {
  entry: path.join(__dirname, './example/src/index.jsx'),
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
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../images/",
            outputPath: "images/"
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