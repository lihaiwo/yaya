// const target = 'http://test.gd-iov.com/charger-system'
const target = 'http://192.168.0.70:3344'

const devProxy = ['/bz', '/weixin', '/android'] // 代理
// 生成代理配置对象
let proxyObj = {}
devProxy.forEach((value, index) => {
  proxyObj[value] = {
    target: target,
    changeOrigin: true,
    pathRewrite: {
      [`^${value}`]: value
    }
    // pathRewrite: function (path, req) {
    //   return path.substring(3)
    // }
  }
})

module.exports = {
  // open: process.platform === 'darwin',
  // host: '0.0.0.0',
  // port: 8080,
  // https: false,
  // hotOnly: false,
  disableHostCheck: true,
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
  proxy: target, // string | Object
  before: app => {}
}
