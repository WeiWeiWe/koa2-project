/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
/**
 * 獲取用戶信息
 * @param {string} userName 用戶名
 * @param {string} password 密碼
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt,
  })
  if (result == null) {
    // 未找到
    return result
  }

  // 格式化
  const formatRes = formatUser(result.dataValues)

  return formatRes
}

/**
 * 創建用戶
 * @param {string} userName 用戶名 
 * @param {string} password 密碼
 * @param {number} gender 性別
 * @param {string} userName 暱稱 
 */
async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName,
  })
  return result.dataValues
}

/**
 * 刪除用戶
 * @param {string} userName 用戶名 
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  // result -> 刪除的行數
  return result > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
}