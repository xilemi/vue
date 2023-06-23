import request from "@/utils/request.js"

export const confirmOrderApi = (params) => {
    return request.get("order/confirmOrder", { params })
}
// 购买后删除
export const deleteCartItemApi = (params) => {
    return request.get("/order/deleteCartItem", { params })
}
export const addOrderApi = (params) => {
    return request.post("/order/addOrder", params)
}
export const updateOrderAddressApi = (params) => {
    return request.post("/order/updateOrderAddress", params)
}
