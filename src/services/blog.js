/**
 * @description 文章 service
 */

const { Blog } = require('../db/model/index')

/**
 * 創建文章
 * @param {Object} param0 創建文章的數據 { userId, content, image }
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}