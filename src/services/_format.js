/**
 * @description 數據格式化
 */

const { DEFAULT_PICTURE } = require('../config/constant')
const { timeFormat } = require('../utils/dt')

/**
 * 用戶默認頭像
 * @param {Object} obj 用戶對象 
 */
function _formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化用戶信息
 * @param {Array|Object} list 用戶列表或者單個用戶對象 
 */
function formatUser(list) {
  if (list == null) {
    return list
  }

  // 用戶列表
  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }

  // 單個對象
  return _formatUserPicture(list)
}

/**
 * 格式化數據的時間
 * @param {Object} obj 數據
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)

  return obj
}

/**
 * 格式化文章信息
 * @param {Array|Object} list 文章列表或者單篇文章數據 
 */
function formatBlog(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    return list.map(_formatDBTime)
  }

  // 單個對象
  return _formatDBTime(list)
}

module.exports = {
  formatUser,
  formatBlog
}