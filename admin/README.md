# admin

# 项目构建
## home
home分了 header aside main  
home 作为一级视图  main作为二级视图 aside 作为路由导航 
使用axios 作为请求工具 请求拦截和响应拦截都是使用的回调函数
### 请求拦截
基本所有的接口都需要携带token请求 所以配置了请求拦截
读取本地的存储的token信息 写在请求头内
### 响应拦截
### 第一层处理 主要是请求的状态
包含两个回调函数,第一个会处理2xx返回内的响应结果,第二个是返回其他错误的响应结果,
都可以返回一个失败状态的promise对象,方便后续的处理
### 第二层处理 返回的数据
解构 response.data,这才是接口真正返回的内容,因为axios对返回结果做了一层包裹.
当 response中的code为200时  直接返回 response.data 
其他code 也可以返回错误的promise对象,方便后续处理


## 用户登录后的权限和等级都存在userInfo中  

checkedKeys中存完整的path 还是 只需要存父级的path?
权限是通过等级role还是checkedKeys判断 还是说两者进行关联
等级1 可以访问所有页面
1.满足等级 直接路由守卫放行 不满足不跳转 并且弹出对应的提示
2.判断是不是在checkedKeys中存在的path 存在 跳转  不存在不跳转，并且提示

点击查看,查看管理员信息,主要是将role,checkedKeys 点击抽屉的操作变为可编辑状态,role使用下拉选框即可
checkedKeys 使用复选框,取消勾选 即可取消 那如何添加呢?将所有的都渲染出来?那么在存储的时候就要把chiidren内都渲染出来.
checkedKeys 是个数组,在路由守卫内进
## checkedKeys 生成menus 思路
 存在数据类  如果有  menus 中的 key  则表示其children 都可以访问 将整个push进来



 ## main.js 分离的原则
 vue 插件是一个有install方法的对象
 Vue.use({
    install(){

    }
 })
或者直接暴露一个函数 不需要install
 
## 深度选择器



















## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
