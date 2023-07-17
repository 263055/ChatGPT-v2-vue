import request from '@/util/request'

// 登录方法
export function loginAndRegister(email, password, code, uuid) {
  const data = {
    email,
    password,
    code,
    uuid
  }
  return request({
    url: '/user/loginAndRegister',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data,
    timeout: 20000
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
    url: '/user/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}
