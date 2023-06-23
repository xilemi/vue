export default {
    userUpdataInfo(state, data) {
        for (let key in data) {
            if (Object.hasOwn(state.userInfo, key)) {
                // 存入的checkedkeys
                state.userInfo[key] = data[key]
            }
        }
    }
}