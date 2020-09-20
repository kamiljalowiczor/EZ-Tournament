const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './frontend/src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'frontend/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './frontend/src/index.html',
      filename: './index.html'
    })
  ]
}
