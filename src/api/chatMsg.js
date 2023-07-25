import request from '@/util/request'

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

