import baseURL from '_conf/url'
export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * 当前环境唯一的http地址
   */
  httpUrl: baseURL || 'http://192.168.0.71:7018',
  /**
   * 分页对象的设置
   */
  page: {
    pageSiz: 10, // 返回数据量
    pageNum: 1,// 数据偏移量
  },
  /**
   * 当前系统的信息
   */
  system: {
    name: 'admin',
    path: '/admin'
  }
}
