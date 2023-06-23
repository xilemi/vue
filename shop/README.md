# shop
使用vue3+vant+pinia 实现的购物商城
# 6.1 项目功能基本实现 
# 存在的问题 
## 组件化  
1.购物车列表,订单,订单详情等位置的列表可以复用
2.地址,在订单,订单详情等页面的选择地址,以及展示地址可以复用
## 提交订单的地址问题 
1.后端问题 没有默认地址就会为空  考虑如何解决
## 注册倒计时 
## 为什么分类信息要存在全局 死数据存本地?
## 路由模块化
## 购物车数据 在购物车和订单两个页面都要访问  ,可以放在 pinia 中
## hooks库 是什么?
## 提交订单的接口   地址不会带过去  
实现  pinia 已经存储了当前选中的地址 读取到地址id  随着请求发送过去 
在后端 通过地址进行查询 
来订单页面  读取默认地址,展示出来 (调读取默认地址的接口) 
点击选择地址后会修改pinia 内的数据 (不要一进到页面就更新pinia的数据)
都是带地址id发送求
总结:问题在于选中的未必是默认地址  没有改地址就使用默认地址 改了地址使用pinia的地址 怎么判断改没改
## 路由组件通信