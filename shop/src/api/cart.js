import request from "@/utils/request.js"

export  const addCartApi = (params) => {
    return request.post("/cart/add",params)
}
export const listCartApi = (params) => {
    return request.post("cart/list",params)
}
export const delCartApi = (params) => {
    return request.post("cart/remove",params)
}
export const claerCartApi = (params) => {
    return request.post("/cart/removeall",params)
}
export const updateCheckOneApi = (params) => {
    return request.post("/cart/selectone",params)
}
export const updateCheckAllApi = (params) => {
    return request.post("/cart/selectall",params)
}
export const updateNumApi = (params) => {
    return request.post("/cart/updatenum",params)
}