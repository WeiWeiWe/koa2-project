/**
 * @description user view 路由
 */

const router = require('koa-router')()

/**
 * 獲取登入信息
 * @param {Object} ctx ctx 
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false, // 默認未登
  }

  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userNmae: userInfo.userName
    }
  }

  return data
}

router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router;