const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AxisSchema = new Schema({
    axis_name: {
        type: String,
        require: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('axis', AxisSchema)