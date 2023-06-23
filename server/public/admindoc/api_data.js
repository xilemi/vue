define({ "api": [
  {
    "type": "get",
    "url": "/admin/address/list",
    "title": "地址列表",
    "name": "GetAddressList",
    "group": "Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '添加地址成功',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/address.js",
    "groupTitle": "Address"
  },
  {
    "type": "get",
    "url": "/admin/admin/detail",
    "title": "获取管理员信息",
    "name": "GetDetailAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminname",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"message\": \"获取管理员信息\" ,\n   data\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/admin/detail"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/admin/add",
    "title": "添加管理员",
    "name": "PostAddAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminname",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "checkedKeys",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\" || '10004',\n  \"message\": \"添加管理员成功\" || 该管理员已存在,\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/admin/add"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/admin/admin/list",
    "title": "管理员列表",
    "name": "PostAdminList",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"message\": \"管理员列表\" \n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/admin/list"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/admin/update",
    "title": "修改管理员信息",
    "name": "PostAdminUpdate",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminname",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "checkedKeys",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n\n  \"message\": \"修改管理员信息\" \n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/admin/update"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/admin/delete",
    "title": "删除管理员",
    "name": "PostDeleteAdmin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminid",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"message\": \"删除管理员\" \n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/admin/delete"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/admin/login",
    "title": "管理系统登录",
    "name": "PostLogin",
    "group": "Admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "adminname",
            "description": "<p>管理员账号 admin</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码 123456</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\" || '10003' || '10005',\n  \"message\": \"登录成功\" || 密码错误 ｜| 未注册,\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/admin/login"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/admin/banner/add",
    "title": "插入轮播图数据",
    "name": "AdminBannerAdd",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img",
            "description": "<p>图片地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "alt",
            "description": "<p>提示信息</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "link",
            "description": "<p>链接地址</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '插入轮播图数据'\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/banner.js",
    "groupTitle": "Banner"
  },
  {
    "type": "get",
    "url": "/admin/banner/delete",
    "title": "删除单条数据",
    "name": "AdminBannerDelete",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bannerid",
            "description": "<p>轮播图id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n   code: '200',\n   message: '查看轮播图数据',\ndata\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/banner.js",
    "groupTitle": "Banner"
  },
  {
    "type": "get",
    "url": "/admin/banner/list",
    "title": "查看轮播图数据",
    "name": "AdminBannerList",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n   code: '200',\n   message: '查看轮播图数据',\ndata\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/banner.js",
    "groupTitle": "Banner"
  },
  {
    "type": "get",
    "url": "/admin/banner/removeAll",
    "title": "删除全部轮播图数据",
    "name": "AdminBannerRemoveAll",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n   code: '200',\n   message: '删除全部轮播图数据',\ndata\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/banner.js",
    "groupTitle": "Banner"
  },
  {
    "type": "post",
    "url": "/admin/banner/updateFlag",
    "title": "访问状态更新",
    "name": "AdminBannerUpdateFlag",
    "group": "Banner",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bannerid",
            "description": "<p>轮播图id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "flag",
            "description": "<p>是否可用</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n   code: '200',\n   message: '访问状态更新成功',\ndata\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/banner.js",
    "groupTitle": "Banner"
  },
  {
    "type": "get",
    "url": "/admin/cart/list1",
    "title": "购物车列表数据-不区分用户",
    "name": "AdminCartList1",
    "group": "Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '购物车列表数据-不区分用户',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/cart.js",
    "groupTitle": "Cart"
  },
  {
    "type": "get",
    "url": "/admin/cart/list2",
    "title": "购物车列表数据-区分用户",
    "name": "AdminCartList2",
    "group": "Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '购物车列表数据-不区分用户',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/cart.js",
    "groupTitle": "Cart"
  },
  {
    "type": "get",
    "url": "/admin/cart/remove",
    "title": "删除购物车数据",
    "name": "AdminDeleteCart",
    "group": "Cart",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cartid",
            "description": "<p>购物车id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '删除购物车数据',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/cart.js",
    "groupTitle": "Cart"
  },
  {
    "type": "get",
    "url": "/admin/order/list",
    "title": "查看全部订单列表",
    "name": "GetOrderList",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '查看全部订单列表',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/admin/order/statusList",
    "title": "查看各种状态订单列表",
    "name": "GetOrderStatusList",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>0 未支付 1 待发货 2 待收获 3 待评价 4 已完成</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '查看各种状态订单列表',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/admin/order/updateStatus",
    "title": "修改订单的状态",
    "name": "updateStatus",
    "group": "Order",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "orderid",
            "description": "<p>orderid</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "status",
            "description": "<p>0 未支付 1 待发货 2 待收获 3 待评价 4 已完成</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '修改订单的状态',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/order.js",
    "groupTitle": "Order"
  },
  {
    "type": "get",
    "url": "/admin/pro/getCategory",
    "title": "获取商品的分类",
    "name": "GetCategory",
    "group": "Pro",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"message\": \"获取商品的分类\",\n   data\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/admin/pro/getCategory"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/pro.js",
    "groupTitle": "Pro"
  },
  {
    "type": "get",
    "url": "/admin/pro/list",
    "title": "获取商品的列表",
    "name": "GetProList",
    "group": "Pro",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>页码，默认值为1</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "limitNum",
            "description": "<p>每页显示个数，默认值为10</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "total",
            "description": "<p>商品的总数量</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"message\": \"获取商品的列表\",\n  \"total\": len,\n  \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/pro/list"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/pro.js",
    "groupTitle": "Pro"
  },
  {
    "type": "post",
    "url": "/admin/pro/searchPro",
    "title": "筛选商品",
    "name": "PostSearchPro",
    "group": "Pro",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "category",
            "description": "<p>分类</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "search",
            "description": "<p>搜索关键词</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"message\": \"筛选商品\",\n  \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/pro/searchPro"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/pro.js",
    "groupTitle": "Pro"
  },
  {
    "type": "post",
    "url": "/admin/pro/showdata",
    "title": "获取秒杀或者推荐的列表",
    "name": "PostShowData",
    "group": "Pro",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>获取数据的依据 （isseckill, isrecommend）</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "flag",
            "description": "<p>表示（1 选中 0 未选中）</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"message\": \"获取秒杀或者推荐的列表\",\n  \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/pro/showdata"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/pro.js",
    "groupTitle": "Pro"
  },
  {
    "type": "post",
    "url": "/admin/pro/updateFlag",
    "title": "修改商品是否推荐或者秒杀",
    "name": "PostUpdateFlag",
    "group": "Pro",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "proid",
            "description": "<p>产品的id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>修改的数据 （isseckill, isrecommend）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "flag",
            "description": "<p>表示（true 选中 false 未选中）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"message\": \"修改商品是否推荐或者秒杀\",\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/admin/pro/updateFlag"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/pro.js",
    "groupTitle": "Pro"
  },
  {
    "type": "get",
    "url": "/admin/pro/detail",
    "title": "详情",
    "name": "ProDetail",
    "group": "Pro",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "proid",
            "description": "<p>产品ID</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>状态码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>描述</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"code\": \"200\",\n  \"message\": \"详情\",\n  \"data\": []\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "/admin/pro/detail"
      }
    ],
    "version": "0.0.0",
    "filename": "admin/pro.js",
    "groupTitle": "Pro"
  },
  {
    "type": "get",
    "url": "/admin/search/list",
    "title": "搜索关键词列表",
    "name": "GetSearchList",
    "group": "Search",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '搜索关键词列表',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/search.js",
    "groupTitle": "Search"
  },
  {
    "type": "get",
    "url": "/admin/statistic/product",
    "title": "商品总数量",
    "name": "StatisticProduct",
    "group": "Statistic",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '商品总数量',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/statistic.js",
    "groupTitle": "Statistic"
  },
  {
    "type": "get",
    "url": "/admin/statistic/user",
    "title": "用户总数量",
    "name": "StatisticUser",
    "group": "Statistic",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '用户总数量',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/statistic.js",
    "groupTitle": "Statistic"
  },
  {
    "type": "get",
    "url": "/admin/user/list",
    "title": "用户列表数据",
    "name": "AdminUserList",
    "group": "User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '用户列表数据',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/admin/data/kData",
    "title": "简单K线图",
    "name": "kData",
    "group": "data",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '简单K线图',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/data.js",
    "groupTitle": "data"
  },
  {
    "type": "get",
    "url": "/admin/data/simpleData",
    "title": "简单图表数据",
    "name": "simpleData",
    "group": "data",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  code: '200',\n  message: '简单图表数据,可以做折线图，柱状图，饼图',\n  data\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "admin/data.js",
    "groupTitle": "data"
  }
] });
