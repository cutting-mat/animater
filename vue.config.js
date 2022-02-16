module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/animater/' : '/',
  css: {
    extract: false
  }
}