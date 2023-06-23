import request from "@/utils/request.js"
export const addRateApi = (params) => {
    return request.post("/rate/add", params)
}
export const listRateApi = (params) => {
    return request.get("/rate/listRate", { params })
}
export const userListRateApi = (params) => {
    return request.get("/rate/userListRate", { params })
}