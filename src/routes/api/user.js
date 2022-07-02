/**
 * @description user API 路由
 */

const router = require('koa-router')()
const { 
  isExist, 
  register, 
  login, 
  deleteCurUser, 
  changeInfo
} = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/user')

// 註冊
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender })
})

// 用戶名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 登入
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 刪除 (測試用)
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 測試環境下，測試帳號登入之後，刪除自己
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
}) 

// 修改個人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

module.exports = router