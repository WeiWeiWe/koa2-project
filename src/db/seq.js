const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../dbConfig/mysqlConf');
const { isProd, isTest } = require('../utils/env');

const { host, user, password, database} = MYSQL_CONF;
const conf = {
  host,
  dialect: 'mysql',
};

if (isTest) {
  // 測試關掉 log
  conf.logging = () => {}
}

if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 1000, // 10s 內沒有被使用，則釋放
  }
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;