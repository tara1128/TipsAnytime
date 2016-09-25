/*
  Webpack configuration
  Author: Alex Wang
  Latest modified 2016-09-25 12:11
*/
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/src');
const args = require('minimist')(process.argv.slice(2));
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
  This plugin moves every require('style.css') in entry chunks into a separate css output file.
  So your styles are no longer inlined into the javascript,
  but separate in a css bundle file (styles.css).
  If your total stylesheet volume is big, it will be faster
  because the stylesheet bundle is loaded in parallel to the javascript bundle.
*/

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

/*
  The very simple configuration object here:
  @context: The base directory (absolute path!) for resolving the entry option.
  @entry: Entry can be a string, an array (the last one is exported) or an object.
  @output: Options affecting the output of the compilation.
  @module: Options affecting the normal modules (NormalModuleFactory).
*/
module.exports = {
  context: __dirname + '/',
  entry: { // Each property of entry would become a chuck!
    entrance: ['./entry.js', './src/js/index']
    // search: ['./src/js/search', './src/js/search-result'] // All in this array become one chuck!
  },
  output: {
    path: __dirname + '/build', // (Required!) The output directory as absolute path.
    filename: '[name].build.js', // Make sure to use [name] or [id] in output.filename
    chuckFilename: '[id].bundle.js', // Have no idea what it does ...
    publicPath: '' // Specifies the public URL of the output files when referenced in a browser.
    // publicPath: 'http://cdn.example.com/assets/[hash]/' // Using a CDN and hashes for assets.
  },
  resolve: { // Options affecting the resolving of modules.
    extensions: ['', '.js'], // An array of extensions that should be used to resolve modules.
    alias: { // Replace modules by other modules or paths. An object with keys being module names while the value is the new path. If the key ends with $ only the exact match (without the $) will be replaced.
    }
  },
  module: {
    /*
    preLoaders: [ // An array of applied pre loaders, with the same syntax of loaders.
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader'
      }
    ],
    */
    loaders: [ // An array of automatically applied loaders.
      /*  In the array of loaders, each item can have these properties:
       *  - test: A condition that must be met, a RegExp (tested against absolute path).
       *  - exclude: A condition that must not be met, a RegExp (tested against absolute path).
       *  - include: A condition that must be met, a RegExp (tested against absolute path).
       *  - loader: A string of '!' seperated loaders.
       *  - loaders: An array of loaders as string.
       */
      {
        test: /\.js$/, // 'test' is commonly used to match the file extension.
        /*
        include: [ // 'include' is commonly used to match the directories.
          path.resolve(__dirname, './src')
        ],
        */
        loader: 'babel-loader'
        // exclude: // 'exclude' should be used to exclude exceptions.
      },
      {
        test: /\.css$/,
        // loader: 'style!css' // '!' is just a seperated mark. These are shorten without '-loader'.
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        // We could also use other loaders the same way, such as autoprefixer-loader.
      },
      {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        // Optionally extract less files, or any other compile-to-css language.
        // loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.(png|jpg|gif|webp|woff|woff2)$/,
        loader: 'url-loader?limit=8192' // Only images not more than 8kb would be packed into Base64.
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
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
