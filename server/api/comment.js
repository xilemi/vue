const router = require('express').Router()
const mysql = require('./../mysql')
const uuid = require('uuid')
const Comment = require("../mysql/collection/Comment")
const { route } = require('./order')



//获取列表   空参数 
router.get("/list", (req, res, next) => {
    mysql.find(Comment, {}, { _id: 0, __v: 0 }).then(data => {
        res.send({
            code: 200,
            message: '获取列表成功',
            data
        })
    })
})

// 添加  传入   title content  iseidt  time  

router.post("/add", (req, res, next) => {
    let insertData = req.body
    insertData.commentid = uuid.v4()
    mysql.insert(Comment, insertData).then(data => {
        res.send({
            code: 200,
            message: '添加成功'
        })
    })
})
// 删除 传入commentid  删除 
router.get("/delete", (req, res, next) => {
    const { commentid } = req.query
    mysql.delete(Comment, { commentid }).then(data => {
        res.send({
            code: 200,
            message: '删除成功'
        })
    })
})

// 修改   传入 commentid title content
router.post("/updata", (req, res, next) => {
    const { commentid, title, content } = req.body
    mysql.update(Comment, { commentid }, { $set: { title: title, content: content } }).then(data => {
        res.send({
            code: 200,
            message: "更新成功"
        })
    })
})
module.exports = router