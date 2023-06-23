import request  from "@/utils/request.js"
 

// 所有
export const searchGradeOrderLimitApi = (params) => {
    return request.get("/php/searchGradeOrderLimit.php",{params})
}
// 添加
export const addGradeApi = (params) => {
    return request.get("/php/addGrade.php",{params})
}
// id查找
export const searchGradeByIdApi = (params) => {
    return request.get("/php/searchGradeById.php",{params})
}
// id删除
export const deleteGradeByIdApi = (params) => {
    return request.get("/php/deleteGradeById.php",{params})
}
// 更新
export const updateGradeByIdApi = (params) => {
    return request.post("/php/updateGradeById.php",params)
}
export const  searchAllGradeApi= (params) => {
    return request.get("/php/searchAllGrade.php",{params})
}