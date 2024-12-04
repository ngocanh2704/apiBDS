const Axis = require("../models/Axis")
const Status = require("../models/Status")


const getAllAxisController = async (req,res) => {
    const allInvestor = await Axis.find({isDelete: false})
    const data = Buffer.from(JSON.stringify({success: true, data: allInvestor})).toString("base64");
res.json(data)
}

const createAxisController = async (req,res) => {
    var values = (JSON.parse(Buffer.from(req.body.values, "base64").toString("utf-8")))
    const axis_name = values.axis_name
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
    const deleteAxis = await Axis.findByIdAndDelete(id)
    res.json({success: true, message:"Trục căn hộ đã được xoá."})
}

const editAxisController = async (req,res) => {
    var values = (JSON.parse(Buffer.from(req.body.values, "base64").toString("utf-8")))
    const axis_name = values.axis_name
    const id = values.id
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