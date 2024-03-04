const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules/'),
      'src': path.resolve(__dirname, 'src/')
    }
  }
};
