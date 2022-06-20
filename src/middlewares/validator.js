/**
 * @description json schema 驗證中間件
 */

const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFailInfo } = require('../model/ErrorInfo')

/**
 * 生成 json schema 驗證的中間件
 * @param {function} validateFn 驗證函數
 */
function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const error = validateFn(data)

    if (error) {
      // 驗證失敗
      ctx.body = new ErrorModel(jsonSchemaFailInfo)
      return
    }

     // 驗證成功
    await next()
  }
  return validator
}

module.exports = {
  genValidator
}