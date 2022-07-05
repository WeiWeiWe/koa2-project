/**
 * @description 文章 view 路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

// 首頁
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

module.exports = router