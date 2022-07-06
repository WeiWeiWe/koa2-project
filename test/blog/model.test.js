/**
 * @description 文章數據模型單元測試
 */

const { Blog } = require('../../src/db/model/index')

test('文章數據模型各個屬性，符合預期', () => {
  const blog = Blog.build({
    userId: 1,
    content: '文章內容',
    image: '/test.png'
  })
  expect(blog.userId).toBe(1)
  expect(blog.content).toBe('文章內容')
  expect(blog.image).toBe('/test.png')
})