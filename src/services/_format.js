/**
 * @description 數據格式化
 */

const { DEFAULT_PICTURE } = require('../config/constant')

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

module.exports = {
  formatUser,
}