/** 
 * @description 連接 redis 的方法 get set
 */

const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

const { port, host } = REDIS_CONF;
const redisClient = redis.createClient(port, host);

redisClient.on('error', err => {
  console.error('redis error', err);
})

/**
 * redis set
 * @param {string} key key 
 * @param {string} val val 
 * @param {number} timeout 過期時間，單位 s 
 */
const set = (key, val, timeout = 60 * 60) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout); 
};

/**
 * redis get
 * @param {string} key 
 */
const get = (key) => {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val == null) {
        resolve(null);
        return;
      }

      try {
        resolve(
          JSON.parse(val)
        )
      } catch(ex) {
        resolve(val);
      }
    });
  });
  return promise;
};

module.exports = {
  set,
  get,
};