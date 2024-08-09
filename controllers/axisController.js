const Axis = require("../models/Axis")
const Status = require("../models/Status")


const getAllAxisController = async (req,res) => {
    const allInvestor = await Axis.find({isDelete: false})
res.json({success: true, data: allInvestor})
}

const createAxisController = async (req,res) => {
    const {axis_name} = req.body
    const axisName = await Axis.findOne({axis_name: axis_name})
    if(axisName)
        return res.status(400).json({success: false, message: "Tên trục căn hộ đã tồn tại."})

    const newAxis = new Axis({
        axis_name:axis_name
    })

    await newAxis.save()
    res.json({success: true, message:"Trục căn hộ đã được tạo."})
}

const deleteAxisController = async (req,res) => {
    const {id} = req.body
    const deleteAxis = await Axis.findByIdAndUpdate(id,{isDelete:true})
    res.json({success: true, message:"Trục căn hộ đã được xoá."})
}

const editAxisController = async (req,res) => {
    const {id, axis_name} = req.body
    const axisName = await Axis.findOne({axis_name: axis_name})
    if(axisName){
        return res.status(400).json({success: false, message: "Trục căn hộ đã tồn tại vui lòng tạo trục căn hộ khác."})
    }

    const editAxis = await Axis.findByIdAndUpdate(id,{
        axis_name: axis_name
    }, {new: true})
    res.json({success: true, message:"Trục căn hộ đã được sửa."})
}

const detailAxisController =  async (req,res) => {
    const {id} = req.body
    const detail = await Axis.findById(id,{isDelete: false})
        res.json({success: true, axis: detail})
}

module.exports = {
    getAllAxisController,
    createAxisController,
    deleteAxisController,
    editAxisController,
    detailAxisController
}