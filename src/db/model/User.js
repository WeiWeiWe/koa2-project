/**
 * @description 用戶數據模型
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

// users
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用戶名，唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密碼'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '暱稱'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性別 (1 男，2 女, 3 保密)'
  },
  picture: {
    type: STRING,
    comment: '頭像，圖片地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})

module.exports = User