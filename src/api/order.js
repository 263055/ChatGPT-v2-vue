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
