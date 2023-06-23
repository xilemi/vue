const router = require('express').Router()
const mysql = require('./../mysql')
const User = require('./../mysql/collection/User')
const Order = require('./../mysql/collection/Order')
const uuid = require('uuid')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
router.get('/', (req, res, next) => {
  res.send('用户相关接口')
})
/**
 * @api {get} /city/city.json 获取城市列表
 * @apiName getCity
 * @apiGroup city
 * 
 */
/**
 * @api {get} /city/sortCity.json 获取城市按照字母排序列表
 * @apiName getSortCity
 * @apiGroup city
 * 
 */
/**
 * @api {post} /api/user/docheckphone 验证手机号码是否被注册过
 * @apiName PostDoCheckPhone
 * @apiGroup User
 * 
 * @apiParam {String} tel 手机号码
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    code: '200',
 *    message: '继续注册'
 *  }
 *  {
 *    code: '10005',
 *    message: '该用户已被注册'
 *  }
 */
router.post('/docheckphone', (req, res, next) => {
  const { tel } = req.body
  mysql.find(User, { tel }, { _id: 0, __v: 0 }).then(data => {
    if (data.length === 0) { // 没有被注册过
      res.send({
        code: '200',
        message: '继续注册'
      })
    } else {
      // 验证密码是不是为空
      if (data[0].password === '') {// 没有被注册过
        res.send({
          code: '200',
          message: '继续注册'
        })
      } else {
        res.send({
          code: '10005',
          message: '该用户已被注册'
        })
      }
    }
  })
})

function getTelCode() {
  return 10000 + Math.floor(Math.random() * 90000)
}
function getRandomName() {
  return '123123'
}

/**
 * @api {post} /api/user/dosendmsgcode 发送短信验证码
 * @apiName PostDoSendMsgCode
 * @apiGroup User
 * 
 * @apiParam {String} tel 手机号码
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    code: '200',
 *    message: '发送短信验证码成功',
 *    data: 12345
 *  }
 */
router.post('/dosendmsgcode', (req, res, next) => {
  const { tel } = req.body
  const telcode = getTelCode()
  // 得到验证码，验证上一次是否有验证码，如果有 更新验证码，如果没有插入数据
  mysql.find(User, { tel }, { _id: 0, __v: 0 }).then(data => {
    if (data.length === 0) { // 没有被注册过，直接可以吧手机号和验证码存入数据库 
      // 插入数据 ---- 数据的默认值
      const insertData = {
        userid: 'user_' + uuid.v4(),
        username: '',
        password: '',
        tel,
        telcode,
        email: '',
        nickname: getRandomName(),
        qq: '',
        wx: '',
        avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3358008061,4231540853&fm=26&gp=0.jpg',
        sex: -1,
        birthday: ''
      }

      mysql.insert(User, insertData).then(() => {
        // 发送短信验证码
        res.send({
          code: '200',
          message: '发送短信验证码成功',
          data: telcode // 真实情况不应该写
        })
      })
    } else {
      if (data[0].telcode !== '') {// 上一次获取过验证码，但是未注册完成，更新验证码
        mysql.update(User, { tel }, { $set: { telcode } }).then(() => {
          // 发送短信验证码
          res.send({
            code: '200',
            message: '发送短信验证码成功',
            data: telcode // 真实情况不应该写
          })
        })
      }
    }
  })
})
/**
 * @api {post} /api/user/docheckcode 验证短信验证码
 * @apiName PostDoCheckCode
 * @apiGroup User
 * 
 * @apiParam {String} tel 手机号码
 * @apiParam {String} telcode 验证码
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    code: '10007',
 *    message: '验证码错误'
 *  }
 * {
 *    code: '200',
 *    message: '继续注册'
 *  }
 */
router.post('/docheckcode', (req, res, next) => {
  const { tel, telcode } = req.body
  mysql.find(User, { tel, telcode }, { _id: 0, __v: 0 }).then(data => {
    if (data.length === 0) {
      res.send({
        code: '10007',
        message: '验证码错误'
      })
    } else {
      res.send({
        code: '200',
        message: '继续注册'
      })
    }
  })
})

/**
 * @api {post} /api/user/dofinishregister 注册
 * @apiName PostDoFinishRegister
 * @apiGroup User
 * 
 * @apiParam {String} tel 手机号码
 * @apiParam {String} password 密码
 */
router.post('/dofinishregister', (req, res, next) => {
  let { tel, password } = req.body
  password = md5(password)
  // 更新数据库
  mysql.update(User, { tel }, { $set: { password, createTime: new Date().getTime() } }).then(() => {
    res.send({
      code: '200',
      message: '注册成功'
    })
  })
})

/**
 * @api {post} /api/user/login 账户名/手机号/邮箱 + 密码的登录方式
 * @apiName PostUserLogin
 * @apiGroup User
 * 
 * @apiParam {String} loginname 账户名/手机号/邮箱
 * @apiParam {String} password 密码
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    code: '10010',
 *    message: '该用户不存在'
 *  }
 * {
 *    code: '10011',
 *    message: '密码错误'
 *  }
 *  {
 *    code: '200',
 *    message: '登录成功',
 *    data: {
 *      token,
 *      userid
 *    }
 *  }
 */
// 账户名/手机号/邮箱 + 密码的登录方式
router.post('/login', (req, res, next) => {
  // loginname 代表 账户名/手机号/邮箱
  const { loginname, password } = req.body
  mysql.find(User, {
    $or: [
      { username: loginname },
      { tel: loginname },
      { email: loginname }
    ]
  }, { _id: 0, __v: 0 }).then(data => {
    if (data.length === 0) {
      // 这个用户不存在
      res.send({
        code: '10010',
        message: '该用户不存在'
      })
    } else {
      // 有该用户，需要验证密码(加密)
      mysql.find(User, {
        $or: [
          { username: loginname, password: md5(password) },
          { tel: loginname, password: md5(password) },
          { email: loginname, password: md5(password) }
        ]
      }, { _id: 0, __v: 0 }).then(result => {
        if (result.length === 0) { // []
          // 密码错误
          res.send({
            code: '10011',
            message: '密码错误'
          })
        } else { // [{ tel: '', ....}]
          // 登录成功
          // 返回用户需要的相关信息
          const token = jwt.sign({ tel: result[0].tel }, 'shop', {
            // expiresIn: 45 // 45秒
            // expiresIn: '15' // 15毫秒
            expiresIn: '15d' // 15天
            // expiresIn: '15h' // 15小时
          })
          const userid = result[0].userid // 判断是哪一个用户的
          res.send({
            code: '200',
            message: '登录成功',
            data: {
              token,
              userid
            }
          })
        }
      })
    }
  })
})
/**
 * @api {get} /api/user/info 获取用户信息
 * @apiName GetUserInfo
 * @apiGroup User
 * @apiHeader {String} token  token
 * @apiParam {String} userid 用户id
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    code: '10119',
 *    message: 'token无效'
 *  }
 *  {
 *    code: '200',
 *    message: '获取个人信息',
 *    data
 *  }
 */
router.get('/info', (req, res, next) => {
  // token 可以通过 头信息，get /post 请求传递给后端
  const { token } = req.headers
  // userid 通过get 传递
  const { userid } = req.query
  // 验证token的有效性
  if (token) { // token 存在
    // console.log(1111111)
    // 验证token的有效性
    jwt.verify(token, 'shop', (err, decoded) => {
      if (err) {
        // console.log(33333)
        // token无效
        res.send({
          code: '10019',
          message: 'token无效'
        })
      } else {
        req.decoded = decoded
        // console.log(4444)
        //  token 有效 --- 返回个人信息
        mysql.find(User, { userid }, { _id: 0, __v: 0, password: 0 }).then(data => {
          res.send({
            code: '200',
            message: '获取个人信息',
            data
          })
        })
      }
    })
  } else { // token 不存在
    // console.log(22222)
    res.send({
      code: '10019',
      message: 'token无效'
    })
  }
})
/**
 * @api {post} /api/user/orderlist 查看全部订单
 * @apiName orderlist
 * @apiGroup User
 * @apiHeader {String} token  token
 * @apiParam {String} userid 用户id
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    code: '200',
 *    message: '查看全部订单',
 *    data
 *  }
 */
// 查看订单信息
router.post('/orderlist', (req, res, next) => {
  const { userid } = req.body
  console.log(userid);
  mysql.find(Order, { userid }, { _id: 0, __v: 0 }).then(data => {
    console.log(data);
    res.send({
      code: '200',
      message: '查看全部订单',
      data
    })
  })
})

/**
 * @api {get} /api/user/updatePassword 修改密码
 * @apiName updatePassword
 * @apiGroup User
 * @apiHeader {String} token  token
 * @apiParam {String} userid 用户id
 * @apiParam {String} oldpassword 旧密码
 * @apiParam {String} newpassword 新密码
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    code: '10030',
 *    message: '原始密码错误'
 *  }
*   {
 *    code: '200',
 *    message: '密码修改成功'
 *  }
 */
// 修改密码
router.get('/updatePassword', (req, res, next) => {
  const { userid, oldpassword, newpassword } = req.query
  mysql.find(User, { userid, password: md5(oldpassword) }, { _id: 0, __v: 0 }).then(data => {
    if (data.length === 0) {
      res.send({
        code: '10030',
        message: '原始密码错误'
      })
    } else {
      mysql.update(User, { userid }, { $set: { password: md5(newpassword) } }).then(() => {
        res.send({
          code: '200',
          message: '密码修改成功'
        })
      })

    }
  })
})


/**
 * @api {get} /api/user/bindusername 绑定用户名
 * @apiName bindusername
 * @apiGroup User
 * @apiHeader {String} token  token
 * @apiParam {String} userid 用户id
 * @apiParam {String} username 用户名
 * @apiSuccessExample {json} Success-Response:
*   {
 *    code: '200',
 *    message: '绑定用户名'
 *  }
 */
// 绑定用户名
router.get('/bindusername', (req, res, next) => {
  const { userid, username } = req.query
  mysql.update(User, { userid }, { $set: { username } }).then(() => {
    res.send({
      code: '200',
      message: '绑定用户名'
    })
  })
})
module.exports = router