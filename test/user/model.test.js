/**
 * @description user model test
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各個屬性，是否符合預期', () => {
  // build 會構建一個內存的 User 實例，但不會提交到數據庫中
  const user = User.build({
    userName: 'aaa',
    password: '123456',
    nickName: 'aaa',
    // gender: 1,
    picture: '/xxx.png',
    city: 'ABC'
  })
  // 驗證各個屬性
  expect(user.userName).toBe('aaa')
  expect(user.password).toBe('123456')
  expect(user.nickName).toBe('aaa')
  expect(user.gender).toBe(3) // 測試 gender 的默認值
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('ABC')
})