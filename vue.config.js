module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/vue-animate-layout/' : '/',
  css: {
    extract: false
  }
}