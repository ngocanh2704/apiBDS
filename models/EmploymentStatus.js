var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EmploymentStatusSchema = new Schema({
    Employment_Status_Name: {
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
    }
})

module.exports = mongoose.model('employmentstatus', EmploymentStatusSchema)