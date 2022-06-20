/**
 * @description json schema 校驗
 */

const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true, // 輸出所有的錯誤，但會比較慢，依照項目大小而定
})

/**
 * json schema 校驗
 * @param {Object} schema json schema 規則
 * @param {Object} date 待校驗的數據 
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errors[0] // 返回第一個錯誤就好了，依照項目大小而定
  }
}

module.exports = validate