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

// 获得邀请日志
export function getInviteLog(page, pageSize) {
    const data = {
        page,
        pageSize,
    }
    return request({
        url: '/order/getInviteLog',
        headers: {
            isToken: true
        },
        method: 'post',
        data: data,
        timeout: 20000
    })
}

// 获得邀请码
export function getInviteCode() {
    return request({
        url: '/order/getInviteCode',
        headers: {
            isToken: true
        },
        method: 'post',
        timeout: 20000
    })
}

// 获得邀请码
export function getInviteIsExist() {
    return request({
        url: '/order/getInviteIsExist',
        headers: {
            isToken: true
        },
        method: 'post',
        timeout: 20000
    })
}

// 设置邀请码
export function setInviteCode(inviteCode) {
    const data = {
        inviteCode,
    }
    return request({
        url: '/order/setInviteCode',
        headers: {
            isToken: true
        },
        method: 'post',
        data: data,
        timeout: 20000
    })
}
