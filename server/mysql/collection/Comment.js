const mongoose = require('../db')
const schema = new mongoose.Schema({
    commentid: { type: String, },
    title: { type: String, },
    content: { type: String, },
    time: { type: String, },
})
module.exports = mongoose.model('Comment', schema)