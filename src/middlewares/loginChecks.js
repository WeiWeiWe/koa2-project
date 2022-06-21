/**
 * @default 登入驗證的中間件
 */

const { ErrorModel } = require("../model/ResModel")
const { loginCheckFailInfo } = require('../model/ErrorInfo')
/**
 * API 登入驗證
 * @param {Object} ctx ctx
 * @param {function} next next
 */
async function loginCheck(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登入
    await next()
    return
  }
  // 未登入
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 頁面登入驗證
 * @param {Object} ctx ctx 
 * @param {function} next next
 */
async function loginRedirect(ctx, next) {
  if (ctx.session && ctx.session.userInfo) {
    // 已登入
    await next()
    return
  }
  // 未登入
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect,
}