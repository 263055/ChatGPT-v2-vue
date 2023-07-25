import request from '@/util/request'

// 获得订单日志
export function getOrderDetail(page, pageSize) {
    const data = {
        page,
        pageSize,
    }
    return request({
        url: '/order/getOrderDetail',
        headers: {
            isToken: true
        },
        method: 'post',
        data: data,
        timeout: 20000
    })
}

// 获得对话日志
export function getChatMsgDetail(page, pageSize) {
    const data = {
        page,
        pageSize,
    }
    return request({
        url: '/chatMsg/getChatLogDetail',
        headers: {
            isToken: true
        },
        method: 'post',
        data: data,
        timeout: 20000
    })
}

// 删除聊天日志
export function deleteChatMsgLog(id) {
    return request({
        url: `/chatMsg/deleteChatMsg/${id}`,
        headers: {
            isToken: true
        },
        method: 'post',
        timeout: 20000
    })
}
