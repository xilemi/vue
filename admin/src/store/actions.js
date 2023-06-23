// 在login 页面内发送请求后  使用userUpdataInfo 更新userInfo数据 不如 将这个过程在 actions 内一起完成
import { adminLogin, adminDetailApi } from "@/api/admin"
import { initUser } from "./types"
import { Message } from "element-ui"
import router from '@/router'
// currentRoute  获取当前路由信息
export default {
    adminLoginInfo({ commit }, data) {
        return adminLogin(data).then(res => {
            //如果又 returnUrl 就去 returnUrl 没有去首页
            let returnUrl = router.currentRoute.query.returnUrl
            if (returnUrl) {
                router.replace(returnUrl)
            } else {
                router.replace('/home')
            }
            commit('userUpdataInfo', res)
            localStorage.setItem('userInfo', JSON.stringify(res))
        }).catch(err => {
            Message({
                message: err,
                duration: 2000,
            })
        })
    },
    adminExitLogin({ commit }) {
        console.log(initUser());
        // 退出登录  删除本地localStorage
        // userInfo 中清空
        let data = initUser()
        commit('userUpdataInfo', data)
        localStorage.removeItem('userInfo')
    },
    getUserInfo({ commit }) {
        // 刷新时获取到 localStorage 中的userInfo数据调用 userUpdataInfo 存入
        let data = JSON.parse(localStorage.getItem('userInfo'))
        commit('userUpdataInfo', data)
    }
}