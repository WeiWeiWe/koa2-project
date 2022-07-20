/**
 * @description 時間相關的工具函數
 */

const { format } = require('date-fns')

/**
 * 格式化時間 -> 02.03 22:31
 * @param {string} str 時間字串
 */
function timeFormat(str) {
  return format(new Date(str), 'MM.dd HH:mm')
}

module.exports = {
  timeFormat
}
