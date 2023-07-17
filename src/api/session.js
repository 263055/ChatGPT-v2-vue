import request from '@/util/request'

// 登录方法
export function createChatRoom(sessionId, sessionTitle) {
  const data = {
    sessionId,
    sessionTitle,
  }
  return request({
    url: '/session/createSession',
    headers: {
      isToken: true
    },
    method: 'post',
    data: data,
    timeout: 20000
  })
}

export function getChatRoom() {
  return request({
    url: '/session/getChatRoom',
    headers: {
      isToken: true
    },
    method: 'post',
    timeout: 20000
  })
}

