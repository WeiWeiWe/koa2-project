/**
 * @description utils controller
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require("../model/ResModel")
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// 存儲目錄
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
// 文件最大體積 1M
const MAX_SIZE = 1024 * 1024 * 1024

// 是否需要創建目錄
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存文件
 * @param {string} name 文件名
 * @param {string} type 文件類型
 * @param {number} size 文件體積大小
 * @param {string} filePath 文件路徑
 */
async function saveFile({ name, type, size, filePath }) {
  if (size > MAX_SIZE) {
    await fse.remove(filePath) // 刪掉檔案，避免佔空間，且文件處理都是異步執行的
    return new ErrorModel(uploadFileSizeFailInfo)
  }

  // 移動文件
  const fileName = Date.now() + '.' + name // 避免同樣名稱文件被覆蓋掉
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName) // 目的地
  await fse.move(filePath, distFilePath)

  // 返回信息
  return new SuccessModel({
    url: '/' + fileName
  })
}

module.exports = {
  saveFile
}