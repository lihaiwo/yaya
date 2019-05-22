const path = require('path')
const fs = require('fs')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const env = process.env.NODE_ENV || 'development'
fs.writeFileSync(path.join(__dirname, './config/env.js'), `export default '${env}'
`)

const devServer = require('./config/dev.env.js') // 反向代理所需要的hosturl
const BASE_URL = './'

module.exports = {
  baseUrl: BASE_URL,
  devServer: devServer,
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/main.js'
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_conf', resolve('config'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false

}
