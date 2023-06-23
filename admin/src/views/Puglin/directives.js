import Vue from 'vue'
import store from '@/store';
// export default {
//     install() {
//         console.log("开始执行");
//         Vue.directive("authority", (el, binding) => {
//             // 绑定的元素 可以对元素进行操作
//             console.log(el);
//             //  binding 中arg 参数  可以根据参数来控制对应的执行
//             console.log('binding', binding);
//             if (store.state.userInfo.role > 2) {
//                 el.disabled = true
//                 el.classList.add("is-disabled")
//             }
//         }
//         )
//     }
// }
//或者直接导出一个函数 不需要install 
export default function () {
    console.log("开始执行");
    Vue.directive("authority", (el, binding) => {
        // 绑定的元素 可以对元素进行操作
        console.log(el);
        //  binding 中arg 参数  可以根据参数来控制对应的执行
        console.log('binding', binding);
        // arg :后面的参数
        // value =传入的内容

        if (store.state.userInfo.role > 2) {
            el.disabled = true
            // el.classList.add("is-disabled")
        }
    }
    )
}