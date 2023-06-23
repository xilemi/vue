import { routeToMenus } from "@/router/index.js"
export default {
    isLogin(state) {
        return !!(state.userInfo.adminname && state.userInfo.role && state.userInfo.token)
    },
    routeToRoleMenus(state) {
        let checkedKeys = state.userInfo.checkedKeys
        let menusCopy = JSON.parse(JSON.stringify(Object.values(routeToMenus())))
        let newMenus = []
        if (state.userInfo.adminname == 'admin') return menusCopy
        menusCopy.forEach(item => {
            // 处理一级菜单  当checkedKeys中存在一级的直接插入 就插入新的数组
            if (checkedKeys.includes(item.path)) {
                newMenus.push(item)
            }
            else {
                let children = item.children
                let newChildMenus = []
                children.forEach(e => {
                    if (checkedKeys.includes(e.path)) {
                        newChildMenus.push(e)
                    }
                })
                if (newChildMenus.length > 0) {
                    item.children = newChildMenus
                    newMenus.push(item)
                }
            }
        });
        console.log(newMenus);
        return newMenus
    }
}