const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PropertiesSchema = new Schema({
    property_name: {
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

module.exports = mongoose.model('properties', PropertiesSchema)