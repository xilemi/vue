import request from "@/utils/request.js"
export const cityApi = () => {
    return request.get("/city/sortCity")
}