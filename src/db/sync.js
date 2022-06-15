/**
 * @description sequelize 同步 DataBase
 */

const seq = require('./seq')

require('./model/index')

// 測試連接
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth err')
})

// 同步數據
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})