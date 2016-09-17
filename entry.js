/*
  entry.js for TipsAnytime
  Author: Alex Wang
  Created Date: 2016-09-13
  Latest Modified: 2016-09-17 09:43
*/

console.log('entry.js is ok!');

/** NOTICE:
  * When using normal css loaders in webpack config files,
  * just require css files in entry.js, no need add link in html.
  * But with ExtractTextPlugin, you should add link into html manually.
  * Require multiple css files one by one here, 
  * the plugin 'ExtractTextPlugin' will make them into one css file,
  * which you need to add into html with link tag, manually.
 **/
require('./src/styles/index.css');
require('./src/styles/details.css');


