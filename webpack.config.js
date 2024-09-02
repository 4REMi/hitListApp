const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'  // Set the template path here
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'  // Output fonts to a specific folder
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext]'  // Output images to a specific folder
        }
      },
      {
        test: /\.(mp4|webm|ogg|avi)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'videos/[name][ext]'  // Output videos to a specific folder
        }
      }
    ]
  }
};
