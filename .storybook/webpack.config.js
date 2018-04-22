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
    ],
  },
};
