const path = require('path');

const aliases = {
  '@': '.',
  '@src': 'src',
  '@router': 'src/router',
  '@views': 'src/views',
  '@layouts': 'src/views/layouts',
  '@components': 'src/components',
  '@assets': 'src/assets',
  '@utils': 'src/utils',
  '@state': 'src/store',
  '@api': 'src/api',
};

module.exports = {
  webpack: {},
  jsconfig: {},
};

function resolveSrc(_path) {
  return path.resolve(__dirname, _path);
}

for (const alias in aliases) {
  const aliasTo = aliases[alias];
  module.exports.webpack[alias] = resolveSrc(aliasTo);
  module.exports.jsconfig[`${alias}/*`] = [`${aliasTo}/*`];
  module.exports.jsconfig[alias] = aliasTo.includes('/index.')
    ? [aliasTo]
    : [
      `${aliasTo}/index.js`,
      `${aliasTo}/index.json`,
      `${aliasTo}/index.vue`,
      `${aliasTo}/index.scss`,
      `${aliasTo}/index.css`,
    ];
}
