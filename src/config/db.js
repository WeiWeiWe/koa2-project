/** 
 * @description 存儲配置
 */

const { isProd } = require('../utils/env');

let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
};

if (isProd) {
  REDIS_CONF = {
    // todo 線上的 redis 配置
    // port: 6379,
    // host: '127.0.0.1',
  }
}

module.exports = {
  REDIS_CONF,  
};