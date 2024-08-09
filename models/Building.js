var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BuildingSchema = new Schema({
    building_name:{
        type: String,
        require: true
    },
    floor: {
        type: String,
        require: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('building', BuildingSchema)