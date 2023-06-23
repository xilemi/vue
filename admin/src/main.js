import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/normalize.css'

import directives from './views/Puglin/directives'

// Vue.use({
//   install() {
//     console.log("开始执行");
//     Vue.directive("authority", (el, binding) => {
//       // 绑定的元素 可以对元素进行操作
//       console.log(el);
//       //  binding 中arg 参数  可以根据参数来控制对应的执行
//       console.log('binding', binding);
//       if (store.state.userInfo.role > 2) {
//         el.disabled = true
//         el.classList.add("is-disabled")
//       }

//     })
//   }
// })
Vue.use(directives)
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
