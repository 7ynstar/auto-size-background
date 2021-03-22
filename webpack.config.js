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
        use: ['style-loader', 'css-loader'],
        // use: [
        //   'style-loader',
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       modules: true,
        //     },
        //   }
        // ]
      },
      // {
      //   test: /\.css$/i,
      //   loader: "css-loader",
      //   options: {
      //     modules: true,
      //   },
      // },
      // {
      //   test: /\.css$/i,
      //   loader: "css-loader",
      //   options: {
      //     modules: {
      //       compileType: "module",
      //       mode: "local",
      //       auto: true,
      //       exportGlobals: true,
      //       localIdentName: "[path][name]__[local]--[hash:base64:5]",
      //       localIdentContext: path.resolve(__dirname, "src"),
      //       localIdentHashPrefix: "my-custom-hash",
      //       namedExport: true,
      //       exportLocalsConvention: "camelCase",
      //       exportOnlyLocals: false,
      //     },
      //   },
      // },
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