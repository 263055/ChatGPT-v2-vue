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

export function getImages(setting) {
    return request({
        url: `/chatMsg/generations`,
        headers: {
            isToken: true
        },
        method: 'post',
        data: setting,
    })
}

// 根据提示词编辑图像
export const createImageEdit = (formData) => {
    return request({
        url: `/chatMsg/editsImage`,
        headers: {
            isToken: true
        },
        method: 'post',
        data: formData
    })
}
