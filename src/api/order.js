import request from '@/util/request'

// 获得订单二维码
export function getQrCode(remark, price, token) {
    const data = {
        remark,
        price,
        token,
    }
    return request({
        url: '/order/getQrCode',
        headers: {
            isToken: true
        },
        method: 'post',
        data: data,
        timeout: 20000
    })
}

// 查询订单状态
export function getQrStatus(aoid) {
    return request({
        url: `/order/getRes/${aoid}`,
        headers: {
            isToken: true
        },
        method: 'get',
        timeout: 20000
    })
}

// 升级套餐
export function updateBalance(balance) {
    const data = {
        balance,
    }
    return request({
        url: '/order/updateBalance',
        headers: {
            isToken: true
        },
        data: data,
        method: 'post',
        timeout: 20000
    })
}
