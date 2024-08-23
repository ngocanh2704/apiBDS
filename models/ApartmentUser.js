const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApartmentUserSchema = new Schema({
    apartment: {
        type: Schema.Types.ObjectId,
        ref: 'apartment'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('apartmentuser', ApartmentUserSchema)