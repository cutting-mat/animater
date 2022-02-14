module.exports = {
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ?
    '/el-upload/' : '/',
  css: {
    extract: false
  }
}