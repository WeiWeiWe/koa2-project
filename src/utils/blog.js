/**
 * @description 文章數據相關的工具方法
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 獲取 blog-list.ejs 的文件內容
const BLOG_LIST_TPL = fs.readFileSync(
  path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 根據 blogList 渲染出 html 字串
 * @param {Array} blogList 文章列表 
 * @param {boolean} canReply 是否可以回覆 
 */
function getBlogListStr(blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = {
  getBlogListStr
}
