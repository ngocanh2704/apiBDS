const mongoose =require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'project'
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'building'
    },
    apartment: {
        type: Schema.Types.ObjectId,
        ref: 'apartment'
    },
    image_link: {
        type: Array,
        require: true
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports =  mongoose.model('image', ImageSchema)