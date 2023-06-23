import axios from "axios"
axios.defaults.baseURL = 'http://121.43.116.41/demo/';
// axios.defaults.headers.common['token'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // axios封装的对象
    console.log(response);
    let { status,message } = response.data
    if (status) {
        return response.data
    }
    // else if (code == "10003") {

    //     return Promise.reject(new Error(message));
    // }
    // else if (code == "10005") {
    //     return Promise.reject(new Error(message));
    // }
    // else if (code == "10119") {
    //     // 清空缓存的 用户信息
    //     return Promise.reject(new Error(message)); 
    // }
    // 如果确定只有200是正确的  可以 直接else  其他的code都是返回个promise
    else {
            return Promise.reject(new Error(message)); 
    }
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});




export default axios
