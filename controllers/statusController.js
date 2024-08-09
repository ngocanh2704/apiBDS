const Status = require('../models/Status')

const getAllStatusController = async (req,res) => {
    const allInvestor = await Status.find({isDelete: false})
    res.json({success: true, data: allInvestor})
}

const createStatusController = async (req,res) => {
    const {status_name} = req.body
    const newStatus = new Status({
        status_name:status_name
    })

    await newStatus.save()
    res.json({success: true, message:"Trục căn hộ đã được tạo."})
}

const deleteStatusController = async (req,res) => {
    const {id} = req.body
    const deleteStatus = await Status.findByIdAndUpdate(id,{isDelete:true})
    res.json({success: true, message:"Trục căn hộ đã được xoá."})
}

const editStatusController = async (req,res) => {
    const {id, status_name} = req.body
    const statusName = await Status.findOne({status_name: status_name})
    if(statusName){
        return res.status(400).json({success: false, message: "Trục căn hộ đã tồn tại vui lòng tạo trục căn hộ khác."})
    }

    const editStatus = await Status.findByIdAndUpdate(id,{
        status_name: status_name
    }, {new: true})
    res.json({success: true, message:"Trục căn hộ đã được sửa."})
}

const detailStatusController = async (req,res) =>{
    const {id} =  req.body
    const status = await Status.findById(id,{isDelete: false})
    res.json({success: true, status})
}

module.exports = {
    getAllStatusController,
    createStatusController,
    deleteStatusController,
    editStatusController,
    detailStatusController
}