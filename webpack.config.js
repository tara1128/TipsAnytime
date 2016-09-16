/*
  Webpack configuration
  Latest modified 2016-09-16 15:09
*/
'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

console.log('args =', args); // { _: [] }

// Set the correct environment
var env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}
process.env.REACT_WEBPACK_ENV = env;
console.log('env =', env);

/*
  The very simple configuration object here:
  @context: The base directory (absolute path!) for resolving the entry option.
  @entry: Entry can be a string, an array (the last one is exported) or an object.
*/
module.exports = {
  context: __dirname + '/',
  entry: { // Each property of entry would become a chuck!
    app: './app.js',
    search: ['./src/js/search', './src/js/search-result'] // All in this array become one chuck!
  },
  output: {
    path: __dirname + '/build', // (Required!) The output directory as absolute path.
    filename: '[name].[hash].common.js', // Make sure to use [name] or [id] in output.filename
    chuckFilename: '[id].bundle.js', // Have no idea what it does ...
    publicPath: '/assets/' // Specifies the public URL of the output files when referenced in a browser. 
    // publicPath: 'http://cdn.example.com/assets/[hash]/' // Using a CDN and hashes for assets.
  },
  resolve: {
    extensions: ['', '.js']
  }
};



// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test'];

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv: The wanted environment
 * @return {Object} Webpack config
 */
function buildWebpackConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';
  let config = require(path.join(__dirname, 'configs/' + validEnv));
  return config;
}

// module.exports = buildWebpackConfig(env);
