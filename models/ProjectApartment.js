const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectApartment = new Schema({
    apartment_id: {
        type: Schema.Types.ObjectId,
        ref: 'apartment'
    },
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },
    axis_id: {
        type: Schema.Types.ObjectId,
        ref: 'axis'
    },
    utility_id:{
        type: Schema.Types.ObjectId,
        ref: 'utility'
    },
    investor_id: {
        type: Schema.Types.ObjectId,
        ref: 'investors'
    },
    user_id: {
        type:Schema.Types.ObjectId,
        ref: 'user'
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('projectapartment', ProjectApartment)