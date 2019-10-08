// node --experimental-modules doesn't support importing named exports from a commonjs module
// esm supports ECMAScript modules in Node 6+ (https://github.com/standard-things/esm)
// eslint-disable-next-line no-native-reassign
require = require('esm')(module);
module.exports = require('./server');
