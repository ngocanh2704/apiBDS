var mongoose = require('mongoose')
var Schema = mongoose.Schema

var EmployeesSchema = new Schema({
    email_address: {
        type: String,
        require: true
    },
    employee_name:{
        type: String,
        require: true,
        unique: false
    },
    start_date: {
        type: Date,
        require: true
    },
    position_ID: {
        type: Schema.Types.ObjectId,
        ref: 'positions'
    },
    // manager_ID: {
    //     type: Schema.Types.ObjectId,
    //     ref: ''
    // }
    department_ID:{
        type: Schema.Types.ObjectId,
        ref: 'Departments'
    },
    gender: {
        type: Boolean,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    },
    dob:{
        type: Date,
        require: true
    },
    cccd_image : {
        type: String,
        require: true
    },
    brand_id :{
        type: Schema.Types.ObjectId,
        require: true
    },
    salary_id :{
        type: Schema.Types.ObjectId,
        require: true
    },
    effective_date: {
        type: Date,
        require: true
    },
    bank_account: {
        type: String,
        require: true
    },
    employment_status_id: {
        type: Schema.Types.ObjectId,
        ref: 'employmentstatus'
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        require: true
    }
})

module.exports = mongoose.model('employees', EmployeesSchema)