const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    employee_ID:{
        type: Schema.Types.ObjectId,
        ref: 'employees'
    },
    status:{
        type: Boolean,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    isDelete:{
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    refreshToken: {
        type: String,
        require: true
    }
},{timestamps: true})
// UsersSchema.index({username:1})
module.exports = mongoose.model('users', UsersSchema)