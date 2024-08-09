const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    project_name: {
        type: String,
        require: true
    },
    investor: {
        type: Schema.Types.ObjectId,
        ref: 'investors'
    },
    location:{
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    status: {
        type: Schema.Types.ObjectId,
        ref: 'status'
    },
    start_date: {
        type: Date,
        require: true
    },
    completion_date:{
        type: Date,
        require: true
    },
    total_units: {
        type: Number,
        require: true
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: 'property'
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        require: true
    }
})

module.exports = mongoose.model('project', ProjectSchema)