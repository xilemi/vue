const router = require('express').Router()
const mysql = require('./../mysql')
const Rate = require('./../mysql/collection/Rate')
const Order = require('../mysql/collection/Order')
const uuid = require('uuid')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
router.get('/', (req, res, next) => {
    res.send('用户相关接口')
})
router.post("/add", (req, res, next) => {
    let insertData = req.body
    insertData.rateid = "rate_" + uuid.v4()
    console.log(insertData.rateid);
    mysql.find(Order, { userid: insertData.userid, proid: insertData.proid }).then(data => {
        console.log(data);
        if (data.length > 0) {
            mysql.insert(Rate, insertData).then(() => {
                res.send({
                    code: '200',
                    message: '评价成功'
                })
            }).catch(err => {
                res.send({
                    code: '10009',
                    message: '输入内容不完整'
                })
            })
        } else {
            res.send({
                code: '10005',
                message: '请购买后评价'
            })
        }
    })
})
router.get("/listRate", (req, res, next) => {
    const { proid } = req.query
    mysql.find(Rate, { proid: proid }, { _id: 0, __v: 0 }).then(data => {
        res.send({
            code: 200,
            message: "获取评价列表成功",
            data
        })
    })
})
router.get("/userListRate", (req, res, next) => {
    const { userid } = req.query
    mysql.find(Rate, { userid: userid }, { _id: 0, __v: 0 }).then(data => {
        res.send({
            code: 200,
            message: '获取用户列表成功',
            data,
        })
    })
})
module.exports = router