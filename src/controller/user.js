/**
 * @description user controller
 */

const { getUserInfo, createUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo, 
  registerFailInfo,
  loginFailInfo,
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 用戶名是否存在
 * @param {string} userName 用戶名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)

  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
} 

/**
 * 註冊
 * @param {string} userName 用戶名
 * @param {string} password 密碼
 * @param {number} gender 性別 (1 男、2 女、3 保密)
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName)

  if (userInfo) {
    // 用戶名已存在
    return ErrorModel(registerUserNameExistInfo)
  }

  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch(ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 登入
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用戶名
 * @param {string} password 密碼
 */
async function login(ctx, userName, password) {
  // 獲取用戶信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    // 登入失敗
    return new ErrorModel(loginFailInfo)
  }
  
  // 登入成功
  if (ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
}