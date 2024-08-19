var EmploymentStatus = require('../models/EmploymentStatus')

const getAllEmploymentStatusController = async (req,res) => {
    const allEmploymentStatus = await EmploymentStatus.find({isDelete:false})
    res.json({success: true, data: allEmploymentStatus})
}

const createEmploymentStatusController = async (req,res) => {
    const {employmentStatus} = req.body
    const employmentstatus = await EmploymentStatus.findOne({Employment_Status_Name: employmentStatus})
    if(employmentstatus){
        return res.status(400).json({success: false, message: "Tình trạng công việc đã tồn tại vui lòng tạo tình trạng công việc khác."})
    }

    const newEmploymentStatus = new EmploymentStatus({
        Employment_Status_Name: employmentStatus
    })

    await newEmploymentStatus.save()
    res.json({success: true, message:"Tình trạng công việc đã được tạo."})
}

const editEmploymentStatusController = async (req,res) => {
    const {id,employmentStatus} = req.body
    const employmentstatuss = await EmploymentStatus.findOne({Employment_Status_Name: employmentStatus})
    if(employmentstatuss){
        return res.status(400).json({success: false, message: "Tình trạng công việc đã tồn tại vui lòng tạo tình trạng công việc khác."})
    }
    const employmentstatus = await EmploymentStatus.findByIdAndUpdate(id,{
        Employment_Status_Name:employmentStatus
    },{new: true})
    res.json({success: true, message:"Tình trạng công việc đã được sửa."})
}

const deleteEmploymentStatusController = async (req,res) => {
    const {id} = req.body
    console.log(id)
    const deleteEmploymentStatus = await EmploymentStatus.findByIdAndDelete(id)
    res.json({success: true, message:"Tình trạng công việc đã được xoá."})
}

module.exports = {
    getAllEmploymentStatusController,
    createEmploymentStatusController,
    deleteEmploymentStatusController,
    editEmploymentStatusController
}