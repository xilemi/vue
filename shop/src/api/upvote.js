import request from "@/utils/request.js"
export const addUpvoteApi = (params) => {
    return request.post("Upvote/addUpvote", params)
}
export const getUpvoteApi = (params) => {
    return request.get("Upvote/getUpvote", { params })
}
export const upvoteNumApi = (params) => {
    return request.get("Upvote/upvoteNum", { params })
}
export const upvoteListApi = (params) => {
    return request.get("Upvote/upvoteList", { params })
}
