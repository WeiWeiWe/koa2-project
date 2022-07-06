/**
 * @description 首頁 test
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')

let BLOG_ID = ''

test('創建一篇文章，應該成功', async () => {
  // 定義測試內容
  const content = '單元測試自動創建的文章_' + Date.now()
  const image = '/xxx.png'

  // 開始測試
  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    })
    .set('cookie', COOKIE)

  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  // 記錄文章 id
  BLOG_ID = res.body.data.id
})