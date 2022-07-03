/**
 * @description user api test
 */

const server = require('../server')

// 用戶信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

// 存儲 cookie
let COOKIE = ''

// 註冊
test('註冊一個用戶，應該成功', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).toBe(0) 
})

// 重複註冊
test('重複註冊用戶，應該失敗', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).not.toBe(0) 
})

// 查詢用戶是否存在
test('查詢註冊的用戶名，應該存在', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).toBe(0) 
})

// json schema 檢測
test('json schema 檢測，非法的格式，註冊應該失敗', async () => {
  const res = await server
    .post('/api/user/register')
    .send({
      userName: '123', // 用戶名要是字母或下劃線開頭
      password: 'a', // 最小長度要是 3
      gender: 'mail' // gender 要是數字
    })
  expect(res.body.errno).not.toBe(0)
})

// 登入
test('登入，應該成功', async () => {
  const res = await server
    .post('/api/user/login')
    .send({
      userName,
      password
    })
  expect(res.body.errno).toBe(0) 

  // 獲取 cookie
  COOKIE = res.header['set-cookie'].join(';')
})

// 修改基本信息
test('修改基本信息，應該成功', async () => {
  const res = await server
    .patch('/api/user/changeInfo')
    .send({
      nickName: '測試暱稱',
      city: '測試城市',
      picture: '/test.png'
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 修改密碼
test('修改密碼，應該成功', async () => {
  const res = await server
    .patch('/api/user/changePassword')
    .send({
      password,
      newPasswrod: `p_${Date.now()}`
    })
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 刪除
test('刪除用戶，應該成功', async () => {
  const res = await server
    .post('/api/user/delete')
    .set('cookie', COOKIE) // 繞過登入驗證
  expect(res.body.errno).toBe(0) 
})

// 退出登入
test('退出登入，應該成功', async () => {
  const res = await server
    .post('/api/user/logout')
    .set('cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

// 再次查詢用戶，應該不存在
test('刪除之後，查詢註冊的用戶名，應該不存在', async () => {
  const res = await server
    .post('/api/user/isExist')
    .send({ userName })
  expect(res.body.errno).not.toBe(0) 
})