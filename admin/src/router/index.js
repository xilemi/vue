import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home/index.vue'
import store from '@/store'
import { Message } from 'element-ui'
// 获取push方法原型
const hackerTargets = ['push', 'replace'];
hackerTargets.forEach((target) => {
  const originalFunction = VueRouter.prototype[target];
  // 更改原型方法
  VueRouter.prototype[target] = function doingHack(location, onResolve, onReject) {
    // 劫持成功或者失败的函数，忽略掉异常报错
    if (onResolve || onReject) return originalFunction.call(this, location, onResolve, onReject);
    return originalFunction.call(this, location).catch(err => err);
  }
})

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'defaultHome',
        label: '首页',
        icon: '',
        meta: {
          role: [1, 2, 3]
        },
        component: () => import("@/views/Home/default/index.vue")
      },
      {
        path: '/goods/list',
        name: 'goodsList',
        component: () => import("@/views/goods/goodsList"),
        label: "商品列表",
        icon: '',
        meta: {
          role: [1, 2, 3]
        },
        parent: { path: '/goods', name: 'goods', label: '商品管理', icon: "" }
      },
      {
        path: '/goods/search',
        name: 'goodsSearch',
        label: "商品搜索",
        icon: '',
        meta: {
          role: [1, 2, 3]
        },
        component: () => import("@/views/goods/goodsSearch"),
        parent: { path: '/goods', name: 'goods', label: '商品管理', icon: "" }
      },
      {
        path: '/banner/add',
        name: 'addBanner',
        label: "轮播新增",
        icon: '',
        meta: {
          role: [1, 2]
        },
        component: () => import("@/views/Banner/addBanner/"),
        parent: { path: '/banner', name: 'banner', label: '轮播管理', icon: "" }
      },
      {
        path: '/banner/list',
        name: 'listBanner',
        label: "轮播列表",
        icon: '',
        meta: {
          role: [1, 2, 3]
        },
        component: () => import("@/views/Banner/listBanner"),
        parent: { path: '/banner', name: 'banner', label: '轮播管理', icon: "" }
      },
      {
        path: '/banner/show',
        name: 'showBanner',
        label: "轮播展示",
        icon: '',
        meta: {
          role: [1, 2, 3]
        },
        component: () => import("@/views/Banner/showBanner/"),
        parent: { path: '/banner', name: 'banner', label: '轮播管理', icon: "" }
      },
      {
        path: '/admin/list',
        name: 'listAdmin',
        label: '账户列表',
        icon: '',
        meta: {
          role: [1, 2]
        },
        component: () => import('@/views/Admin/listAdmin'),
        parent: { path: '/admin', name: 'admin', label: '账户管理', icon: '' }
      },
      {
        path: '/admin/add',
        name: 'addAdmin',
        label: '账户添加',
        icon: '',
        meta: {
          role: [1]
        },
        component: () => import('@/views/Admin/addAdmin'),
        parent: { path: '/admin', name: 'admin', label: '账户管理', icon: '' }
      },
      {
        path: '/puglin/echarts',
        name: 'echarts',
        label: 'echarts',
        icon: '',
        meta: {
          role: [1, 2, 3]
        },
        component: () => import('@/views/Puglin/echarts'),
        parent: { path: '/plugin', name: 'plugin', label: '插件', icon: '' }
      },
      {
        path: '/puglin/editor',
        name: 'editor',
        label: 'editor',
        icon: '',
        meta: {
          role: [1, 2, 3]
        },
        component: () => import('@/views/Puglin/editor'),
        parent: { path: '/plugin', name: 'plugin', label: '插件', icon: '' }
      },
      {
        path: '/puglin/directive',
        name: 'directive',
        label: 'directive',
        icon: '',
        meta: {
          role: [1, 2, 3]
        },
        component: () => import('@/views/Puglin/directive'),
        parent: { path: '/plugin', name: 'plugin', label: '插件', icon: '' }
      },
    ]
  },
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('@/views/Login/')
  },
  {
    path: '/notfound',
    name: 'NotFoundView',
    component: () => import('@/views/404/NotFound')
  },
  {
    path: '*',
    redirect: '/notfound'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
export let routeToMenus = () => {
  let menus = {}
  // 取{path,name,label,icon}  path 为空的不要 
  // 从children 中开始取
  let children = routes[0].children
  children.forEach(item => {
    // 为空 直接退出
    if (item.path == '') return
    else if (!Object.hasOwn(item, "parent")) {
      let { name, path, icon, label } = item
      menus[item.name] = { name, path, icon, label }
    }
    else if (Object.hasOwn(item, "parent")) {
      if (!Object.hasOwn(menus, item.parent.name)) {
        let { name, path, label, icon } = item.parent
        menus[item.parent.name] = { name, path, label, icon }
        menus[item.parent.name].children = []
      }
      let { name, path, icon, label } = item
      menus[item.parent.name].children.push({ name, path, icon, label })
    }
  })
  return menus
}
export let routeToRoleTree = (a) => {
  let menus = {}
  // 取{path,name,label,icon}  path 为空的不要 
  // 从children 中开始取
  let children = routes[0].children.filter(item => {
    return item.meta?.role?.includes(a)
  })
  children.forEach(item => {
    // 为空 直接退出
    if (item.path == '') return
    else if (!Object.hasOwn(item, "parent")) {
      let { name, path, icon, label } = item
      menus[item.name] = { name, path, icon, label }
    }
    else if (Object.hasOwn(item, "parent")) {
      if (!Object.hasOwn(menus, item.parent.name)) {
        let { name, path, label, icon } = item.parent
        menus[item.parent.name] = { name, path, label, icon }
        menus[item.parent.name].children = []
      }
      let { name, path, icon, label } = item
      menus[item.parent.name].children.push({ name, path, icon, label })
    }
  })
  return menus
}
// 上面的功能实现对侧边菜单的根据权限进行自定义的展示,那么如果知道地址还是可以在浏览器进行访问
// 因此需要对路由做出一些限制
// 使用全局路由  但是不是全局路由都需要这个验证 
// 404 login 页面是不需要验证的 登录验证也不需要
let whiteName = ['/notfound', "/login", "/"]
let count = 0
router.beforeEach(async (to, from, next) => {
  if (!whiteName.includes(to.path)) {
    await store.dispatch("getUserInfo")
    next()
  }
  else {
    next()
  }
  // 执行下存储userInfo
})
// 此时state内还没有数据
router.beforeEach((to, from, next) => {
  // 验证跳转的路径是否存在于  checkedKeys内
  // 问题在于这里为什么没有用户数据
  console.log(store.state.userInfo);
  console.log(store.getters.isLogin);
  if (!whiteName.includes(to.path)) {
    console.log(store.getters.isLogin);
    if (store.getters.isLogin) {
      if (store.state.userInfo.adminname == 'admin') {
        next()
      } else if (store.state.userInfo.checkedKeys.includes(to.path)) {
        console.log(11);
        next()
      } else {
        Message({
          type: 'error',
          message: '禁止访问'
        })
        next(false)
      }
    } else {
      router.push({ path: '/login' })
      Message({
        type: 'error',
        message: '未登录,请登录'
      })
      next()
    }
  } else {
    next()
  }
})
export default router
