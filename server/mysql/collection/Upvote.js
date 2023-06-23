const mongoose = require('../db')
const schema = new mongoose.Schema({
    userid: { type: String, required: true },
    proid: { type: String, required: true },
    isLike: { type: Boolean, required: true },
    time: { type: String, required: true }
})

module.exports = mongoose.model('Upvote', schema)