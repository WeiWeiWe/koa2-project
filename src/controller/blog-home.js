/**
 * @description blog 首頁 controller
 */

const { createBlog } = require('../services/blog')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')

/**
 * 創建文章
 * @param {Object} param0 創建文章所需的數據 { userId, content, image }
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({ userId, content, image })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}