import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import 'vant/lib/index.css';
import "vant/es/toast/style";
import "@/style/reset.css"
import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia)

app.use(router)

app.mount('#app')
