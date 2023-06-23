const mongoose = require('../db')
const schema = new mongoose.Schema({
    rateid: { type: String, required: true },
    userid: { type: String, required: true },
    proid: { type: String, required: true },
    grade: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: String, required: true }
})

module.exports = mongoose.model('Rate', schema)