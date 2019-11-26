const WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');
const path = require('path');
console.log(path.join(__dirname, '../src/assets/fonts/'));
module.exports = new WebpackIconfontPluginNodejs({
    fontName: 'iconfont',
    svgs: path.join(__dirname, '../src/icons/*.svg'),
    fontsOutput: path.join(__dirname, '../src/assets/fonts/'),
    cssOutput: path.join(__dirname, '../src/assets/style/_font.css'),
    htmlOutput: path.join(__dirname, '../src/assets/fonts/_font-preview.html'),
    jsOutput: path.join(__dirname, '../src/assets/fonts/fonts.js'),
    formats: ['ttf', 'woff2', 'woff', 'svg'],
    cssPrefix: 'icon'
})