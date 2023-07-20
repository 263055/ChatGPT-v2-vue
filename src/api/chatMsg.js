import request from '@/util/request'

// 发消息
export function send(question, options, prompt, setting) {
  const data = {
    question,
    options,
    prompt,
    setting,
  }
  return request({
    url: '/chatMsg/send',
    headers: {
      isToken: true
    },
    method: 'post',
    data: data,
    timeout: 20000
  })
}

//
// export function updateChatRoom(sessionId, sessionTitle) {
//   const data = {
//     sessionId,
//     sessionTitle,
//   }
//   return request({
//     url: '/session/updateSessionName',
//     headers: {
//       isToken: true
//     },
//     method: 'post',
//     data: data,
//     timeout: 20000
//   })
// }
//
// export function getChatRoom() {
//   return request({
//     url: '/session/getChatRoom',
//     headers: {
//       isToken: true
//     },
//     method: 'post',
//     timeout: 20000
//   })
// }

export function getMessage(sessionId) {
  return request({
    url: `/chatMsg/getMsg/${sessionId}`,
    headers: {
      isToken: true
    },
    method: 'post',
    timeout: 20000
  })
}

