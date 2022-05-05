/**
 * @description sequelize 同步 DataBase
 */

const seq = require('./seq')

// require('./model')

seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth err')
})

seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})