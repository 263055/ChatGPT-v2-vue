import request from '@/util/request'

// 登录方法
export function loginAndRegister(username, password, code) {
  const data = {
    username,
    password,
    code,
  }
  return request({
    url: '/user/loginAndRegister',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    // timeout: 20000
  })
}
