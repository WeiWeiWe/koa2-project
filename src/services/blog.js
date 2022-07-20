/**
 * @description 文章 service
 */

const { Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')

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

/**
 * 根據用戶獲取文章列表
 * @param {Object} param0 查詢參數 { userName, pageIndex = 0, pageSize = 10 }
 */
async function getBlogListByUser(
  { userName, pageIndex = 0, pageSize = 10 }
) {
  // 拼接查詢條件
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }

  // 執行查詢
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每頁多少筆數據
    offset: pageSize * pageIndex, // 跳過多少筆數據
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })

  // 獲取 dataValues
  let blogList = result.rows.map(row => row.dataValues)

  // 格式化
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })

  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}