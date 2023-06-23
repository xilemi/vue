// 混入的作用,类似与vuex  全局可以访问的数据, 可以包含vue实例中的data methods computed 生命周期等等
import store from './store'
export default {
    methods: {
        buttonAble() {
            if (store.state.userInfo.role < 3) {
                return true
            }
            else {
                return false
            }
        }
    },
}