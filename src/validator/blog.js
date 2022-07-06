/**
 * @description 文章 數據格式校驗
 */

const validate = require('./_validate')

// 校驗規則
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * 校驗文章數據格式
 * @param {Object} data 文章數據
 */
function blogValidate(data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate