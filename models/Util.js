const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UtilitySchema = new Schema({
    utility_name: {
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

module.exports = mongoose.model('utility', UtilitySchema)