const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@course': path.resolve(__dirname, 'src/pages/Course'),
      '@internal': path.resolve(__dirname, 'src/pages/Internal'),
      '@question': path.resolve(__dirname, 'src/pages/Question'),
      '@service': path.resolve(__dirname, 'src/service'),
      '@study': path.resolve(__dirname, 'src/pages/Study'),
      '@style': path.resolve(__dirname, 'src/style'),
      '@user': path.resolve(__dirname, 'src/pages/User')
    }
  };

  return config;
};
