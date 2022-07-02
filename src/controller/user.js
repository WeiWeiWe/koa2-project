/**
 * @description user controller
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo, 
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
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
    return new ErrorModel(registerUserNameExistInfo)
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

/**
 * 刪除當前用戶
 * @param {string} userName 用戶名 
 */
async function deleteCurUser(userName) {
  const result = await deleteUser(userName)

  if (result) {
    // 刪除成功
    return new SuccessModel()
  }
  // 刪除失敗
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改個人信息
 * @param {Object} ctx ctx
 * @param {string} nickName 暱稱
 * @param {string} city 城市
 * @param {string} picture 頭像
 */
async function changeInfo(ctx, { nickName, city, picture}) {
  const { userName } = ctx.session.userInfo
  if (!nickName) {
    nickName = userName
  }

  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName }
  )
  if (result) {
    // 執行成功後，session 需要修改
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密碼
 * @param {string} userName 用戶名
 * @param {string} password 當前密碼
 * @param {string} newPassword 新密碼
 */
async function changePassword(userName, password, newPassword) {
  const result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    { 
      userName, 
      password: doCrypto(password) 
    },
  )
  if (result) {
    return new SuccessModel()
  }
  return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登入
 * @param {Object} ctx ctx
 */
async function logout(ctx) {
  delete ctx.session.userInfo
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  changePassword,
  logout
}