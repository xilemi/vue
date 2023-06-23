import request from "@/utils/request"
export const addBannerApi = (params) => {
    return request.post('banner/add', params).then(response => {
        return response
    })
}
export const listBannerApi = () => {
    return request.get('banner/list').then(response => {
        return response
    })
}
export const delBannerApi = (params) => {
    return request.get('banner/delete', { params }).then(response => {
        return response
    })
}
export const removeBannerApi = (params) => {
    return request.get('banner/removeAll', { params }).then(response => {
        return response
    })
}
export const updateBannerFlagApi = (params) => {
    return request.post('banner/updateFlag', params).then(response => {
        return response
    })
}
