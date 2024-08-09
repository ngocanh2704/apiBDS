const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BalconyDirectionSchema = new Schema({
    balcony_direction_name: {
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

module.exports = mongoose.model('balconydirection', BalconyDirectionSchema)