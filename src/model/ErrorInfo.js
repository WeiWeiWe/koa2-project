/**
 * @description 失敗信息集合，包括 errno 和 message
 */

module.exports = {
  registerUserNameExistInfo: {
    errno: 10001,
    message: '用戶名已存在'
  },
  registerFailInfo: {
    errno: 10002,
    message: '註冊失敗，請重試'
  },
  registerUserNameNotExistInfo: {
    errno: 10003,
    message: '用戶名未存在'
  },
  jsonSchemaFailInfo: {
    errno: 10009,
    message: '數據格式校驗錯誤'
  }
}