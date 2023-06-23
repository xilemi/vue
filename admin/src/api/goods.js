import request from "@/utils/request";

export const goodsList = (data) => {
    return request.get('pro/list', { params: data }).then(response => {
        return response
    })
}
export const goodsSearch = (data) => {
    return request.post('pro/searchPro', data).then(response => {
        return response
    })
}
export const updateFlag = (data) => {
    return request.post('pro/updateFlag', data).then(response => {
        return response
    })
}
export const getCategoryApi = () => {
    return request.get("pro/getCategory").then(response => {
        return response
    })
}
export const getDetailApi = (params) => {
    return request.get("pro/detail", { params }).then(response => {
        return response
    })
}