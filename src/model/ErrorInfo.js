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
  loginFailInfo: {
    errno: 10004,
    message: '登入失敗，用戶名或密碼錯誤'
  },
  loginCheckFailInfo: {
    errno: 10005,
    message: '您尚未登入'
  },
  changePasswordFailInfo: {
    errno: 10006,
    message: '修改密碼失敗，請重試'
  },
  uploadFileSizeFailInfo: {
    errno: 10007,
    message: '上傳文件尺寸過大'
  },
  changeInfoFailInfo: {
    errno: 10008,
    message: '修改基本信息失敗'
  },
  jsonSchemaFailInfo: {
    errno: 10009,
    message: '數據格式校驗錯誤'
  },
  deleteUserFailInfo: {
    errno: 10010,
    message: '刪除用戶失敗'
  }
}