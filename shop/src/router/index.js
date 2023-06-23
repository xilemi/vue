import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import ComFooter from "@/components/ComFooter.vue"
import RegisterView from "../views/login/RegisterView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
        footer: ComFooter
      },
      meta: {
        label: '首页'
      }
    },
    {
      path: '/list',
      name: 'list',
      components: {
        default: () => import('../views/list/ListView.vue'),
        footer: ComFooter
      },
      meta: {
        label: '列表'
      }
    },
    {
      path: '/car',
      name: 'car',
      components: {
        default: () => import('../views/cart/CarView.vue'),
        footer: ComFooter
      },
      meta: {
        label: '购物车'
      }
    },
    {
      path: '/mine',
      name: 'mine',
      components: {
        default: () => import("@/views/mine/MineView.vue"),
        footer: ComFooter
      },
      meta: {
        label: '我的'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        label: '注册页'
      }
    },
    {
      path: "/login",
      name: 'login',
      component: () => import("@/views/login/LoginView.vue"),
      meta: {
        label: "登录页"
      }
    },
    {
      path: "/Prodetail",
      name: 'Prodetail',
      component: () => import("@/views/list/ProDetailView.vue"),
      meta: {
        label: "详情页"
      }
    },
    {
      path: "/order",
      name: 'order',
      component: () => import("@/views/order/OrderView.vue"),
      meta: {
        label: "订单页"
      }
    },
    {
      path: "/addAddress",
      name: 'addAddress',
      component: () => import("@/views/address/AddAddress.vue"),
      meta: {
        label: "添加地址"
      }
    },
    {
      path: "/addressList",
      name: 'addressList',
      component: () => import("@/views/address/AddressList.vue"),
      meta: {
        label: "地址列表"
      }
    },
    {
      path: "/orderDetail",
      name: 'orderDetail',
      component: () => import("@/views/order/OrderDetail.vue"),
      meta: {
        label: "订单详情"
      }
    },
    {
      path: "/orderList",
      name: 'orderList',
      component: () => import("@/views/order/OrderListView.vue"),
      meta: {
        label: "我的订单"
      }
    },
    {
      path: "/proBrand",
      name: 'proBrand',
      component: () => import("@/views/list/proBrandView.vue"),
      meta: {
        label: "品牌产品"
      }
    },
    {
      path: "/search",
      name: 'search',
      component: () => import("@/views/search/SearchView.vue"),
      meta: {
        label: "搜索"
      }
    },
    {
      path: "/city",
      name: 'city',
      component: () => import("@/views/city/CityView.vue"),
      meta: {
        label: "选择城市"
      }
    },
    {
      path: "/rateList",
      name: 'rateList',
      component: () => import("@/views/list/rateList.vue"),
      meta: {
        label: "我的评价"
      }
    },
    {
      path: "/upvoteList",
      name: 'upvoteList',
      component: () => import("@/views/list/upvoteList.vue"),
      meta: {
        label: "我的点赞"
      }
    },
  ]
})

export default router;
