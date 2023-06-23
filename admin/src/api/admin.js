// 登录接口
import request from "@/utils/request";
export const adminLogin = (params) => {
    return request.post('admin/login', params).then(response => {
        return response.data
    })
}
export const adminAddApi = (params) => {
    return request.post('admin/add', params).then(response => {
        return response
    })
}
export const adminDeleteApi = (params) => {
    return request.post('admin/delete', params).then(response => {
        return response
    })
}
export const adminUpdateApi = (params) => {
    return request.post('admin/update', params).then(response => {
        return response
    })
}
export const adminDetailApi = (params) => {
    return request.get('admin/detail', { params }).then(response => {
        return response
    })
}
export const adminListApi = (params) => {
    return request.get('admin/list', { params }).then(response => {
        return response
    })
}
