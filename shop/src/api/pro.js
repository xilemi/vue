import request from "@/utils/request.js"
export const proListApi = (params) => {
    return request.get("/pro/list", { params })
}
export const proDetailApi = (params) => {
    return request.get("pro/detail/" + params.proid)
}
// 分类下的品牌
export const proCategoryBrandListApi = (params) => {
    return request.get("pro/categorybrandlist", { params })
}
// 分类列表
export const proCategoryListApi = (params) => {
    return request.get("pro/categorylist", { params })
}
// 搜索
export const proSearchApi = (params) => {
    return request.get("pro/search", { params })
}
// 热词
export const proHotWordApi = (params) => {
    return request.get("pro/hotword", { params })
}
// 推荐
export const proRecommendListApi = (params) => {
    return request.get("/pro/recommendlist", { params })
}
// 分类下品牌产品
export const proCategoryBrandProListApi = (params) => {
    return request.get("/pro/categorybrandprolist", { params })
}
// 秒杀
export const proSeckillListApi = (params) => {
    return request.get("/pro/seckilllist", { params })
}
