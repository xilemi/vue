import axios from 'axios'
import { useUserStore } from '../stores/user.js';
import { storeToRefs } from 'pinia';
// 从本地取token
// axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.baseURL = 'http://20.163.25.85:3000/api/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let User = useUserStore();
    let {token} = storeToRefs(User);
    if (token.value) {
        config.headers.token = token.value;
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});



axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // axios封装的对象
    // console.log("response", response);

    let { code, message } = response.data
    if (code == 200) {
        
        return response.data
    }
    // 如果确定只有200是正确的  可以 直接else  其他的code都是返回个promise
    else {
        return Promise.reject(new Error(message));
    }
    //后续在那个阶段进行捕获错误比较好呢
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
    
});




export default axios
