const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devServer: {
    port: 3030
  }
}