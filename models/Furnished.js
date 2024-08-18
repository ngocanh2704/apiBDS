const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FurnishedSchema = new Schema({
    furnished_name: {
        type: String,
        require: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('furnished', FurnishedSchema)