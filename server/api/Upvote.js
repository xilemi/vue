const router = require('express').Router()
const mysql = require('../mysql')
const Upvote = require('../mysql/collection/Upvote')
const uuid = require('uuid')
// 通过记录userid proid  islike time  islike 点状的状态
// 通过 userid 和proid 查不到记录  插入记录 能够查到记录 将点赞状态设置为false

router.post("/addUpvote", (req, res, next) => {
    // 直接在 upvote 表 查数据 传入userid  proid  time(后端获取吧 ) islike 这样设计表好吗 ?
    // post 请求 body    
    const { userid, proid } = req.body
    mysql.find(Upvote, { userid, proid }).then(data => {
        // 如果找不到  没有点赞过  进行点赞
        if (data.length == 0) {
            const time = new Date().getTime()
            mysql.insert(Upvote, { userid, proid, time, isLike: 1 }).then(data => {
                res.send({
                    code: '200',
                    message: '点赞成功'
                })
            })
        }
        else if (data.length == 1) {
            // 有点赞记录
            mysql.update(Upvote, { userid, proid }, { $set: { isLike: !data[0].isLike } }).then(data => {
                res.send({
                    code: "200",
                    message: '更新点赞状态成功'
                })
            })
        }
    })
})



// 判断商品在当前用户下是否点赞
router.get("/getUpvote", (req, res, next) => {
    const { userid, proid } = req.query
    console.log(userid, proid);
    mysql.find(Upvote, { userid, proid }).then(data => {
        //有点赞记录
        if (data.length) {
            res.send({
                code: "200",
                message: "获取点赞记录成功",
                isLike: data[0].isLike
            })
        }
        // 没有点赞记录的 
        else {
            console.log(11);
            res.send({
                code: '200',
                message: "获取点赞记录成功",
                isLike: 0
            })
        }
    })
})

// 商品点赞数量  proid 查
router.get("/upvoteNum", (req, res, next) => {
    const { proid } = req.query
    console.log(proid);
    mysql.find(Upvote, { proid, isLike: true }).then(data => {
        res.send({
            code: 200,
            message: "查询成功",
            num: data.length
        })
    })
})
// 用户点赞列表 userid isLike
router.get("/upvoteList", (req, res, next) => {
    const { userid } = req.query
    mysql.find(Upvote, { userid, isLike: true }).then(data => {
        res.send({
            code: 200,
            message: '获取点赞列表成功',
            data
        })
    })
})
module.exports = router