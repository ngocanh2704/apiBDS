const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OwnerSchema = new Schema({
    husband_name: {
        type: String,
        require: true
    },
    husband_phone_number: {
        type: Number,
        require: true
    },
    wife_name: {
        type: String,
        require: true
    },
    wife_phone_number: {
        type: Number,
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

module.exports = mongoose.model('owner', OwnerSchema)