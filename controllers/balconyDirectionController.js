const BalconyDirection = require("../models/BalconyDirection")

const getAllBalconyDirectionController = async (req,res) => {
    const allInvestor = await BalconyDirection.find({isDelete: false})
    res.json({success: true, data: allInvestor})
}

const createBalconyDirectionController = async (req,res) => {
    const {balcony_direction_name} = req.body

    const newBalconyDirection= new BalconyDirection({
        balcony_direction_name:balcony_direction_name
    })

    await newBalconyDirection.save()
    res.json({success: true, message:"Hướng đã được tạo."})
}

const deleteBalconyDirectionController = async (req,res) => {
    const {id} = req.body
    const deleteBalconyDirection = await BalconyDirection.findByIdAndUpdate(id,{isDelete:true})
    res.json({success: true, message:"Trục căn hộ đã được xoá."})
}

const editBalconyDirectionController = async (req,res) => {
    const {id, balcony_direction_name} = req.body
    const balconyDirectionName = await BalconyDirection.findOne({balcony_direction_name: balcony_direction_name})
    if(balconyDirectionName){
        return res.status(400).json({success: false, message: "Trục căn hộ đã tồn tại vui lòng tạo trục căn hộ khác."})
    }

    const editBalconyDirection = await BalconyDirection.findByIdAndUpdate(id,{
        balcony_direction_name: balcony_direction_name
    }, {new: true})
    res.json({success: true, message:"Trục căn hộ đã được sửa."})
}

const detailBalconyDirectionController = async (req,res) => {
    const {id} = req.body
    const data = await BalconyDirection.findById(id,{isDelete: false})
    res.json({success: true, data})
}

module.exports = {
    getAllBalconyDirectionController,
    createBalconyDirectionController,
    deleteBalconyDirectionController,
    editBalconyDirectionController,
    detailBalconyDirectionController
}