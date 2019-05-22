import env from './env'

/**
 * 支持跨域才采用这种方式
 */
const DEV_URL = ''
const PRO_URL = '/charger-system'

export default env === 'development' ? DEV_URL : PRO_URL
