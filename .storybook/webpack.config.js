const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]--[local]--[hash:base64:5]',
          'postcss-loader',
        ],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
        include: path.resolve(__dirname, '../'),
      },
    ],
  },
};
