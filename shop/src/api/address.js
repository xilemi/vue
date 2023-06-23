import request from "@/utils/request.js"

export  const  addAddressApi= (params) => {
    return request.post("address/add",params)
}
export const getDefaultAddressApi = (params) => {
    return request.post("address/defaultAddress",params)
}
export const updateAddressApi = (params) => {
    return request.post("address/update",params)
}
export const delAddressApi = (params) => {
    return request.post("address/delete",params)
}
export  const  addressListApi= (params) => {
    return request.get("/address/list",{params})
}
