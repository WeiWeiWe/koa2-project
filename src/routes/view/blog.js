/**
 * @description 文章 view 路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')

// 首頁
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 個人主頁
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`) // 訪問自己的個人主頁
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 已登入用戶的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName

  // 判斷是不是當前用戶
  if (isMe) {
    // 當前用戶
    curUserInfo = myUserInfo
  } else {
    // 不是當前用戶
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用戶名不存在
      return 
    }
    curUserInfo = existResult.data
  }

  // 獲取文章第一頁數據
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe
    }
  })
})

module.exports = router