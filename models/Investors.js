const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvestorsSchema = new Schema({
    investor_name: {
        type: String,
        require: true
    },
    isDelete: {
        type: Boolean,
        default: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('investors', InvestorsSchema)