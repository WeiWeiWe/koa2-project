/**
 * @description 文章數據模型
 */

const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../types')

const Blog = seq.define('blog', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用戶 ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '文章內容'
  },
  image: {
    type: STRING,
    comment: '圖片地址'
  }
})

module.exports = Blog