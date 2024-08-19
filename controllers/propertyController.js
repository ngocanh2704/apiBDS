const Properties = require("../models/Properties")

const getAllPropertyController = async (req,res) => {
    const allInvestor = await Properties.find({isDelete: false})
    res.json({success: true, data: allInvestor})
}

const createPropertyController = async (req,res) => {
    const {property_name} = req.body
    const propertyName = await Properties.findOne({property_name: property_name})
    if(propertyName)
        return res.status(400).json({success: false, message: "Tên trục căn hộ đã tồn tại."})

    const newProperty = new Properties({
        property_name:property_name
    })
    console.log(newProperty)

    await newProperty.save()
    res.json({success: true, message:"Trục căn hộ đã được tạo."})
}

const deletePropertyController = async (req,res) => {
    const {id} = req.body
    const deleteProperty = await Properties.findByIdAndDelete(id)
    res.json({success: true, message:"Trục căn hộ đã được xoá."})
}

const editPropertyController = async (req,res) => {
    const {id, property_name} = req.body
    const propertyName = await Properties.findOne({property_name: property_name})
    if(propertyName){
        return res.status(400).json({success: false, message: "Trục căn hộ đã tồn tại vui lòng tạo trục căn hộ khác."})
    }

    const editProperty = await Properties.findByIdAndUpdate(id,{
        property_name: property_name
    }, {new: true})
    res.json({success: true, message:"Trục căn hộ đã được sửa."})
}

const detailPropertyController =  async (req,res) => {
    const {id} = req.body
    const detail = await Properties.findById(id,{isDelete: false})
    console.log(detail)
        res.json({success: true, property: detail})
}

module.exports = {
    getAllPropertyController,
    createPropertyController,
    deletePropertyController,
    editPropertyController,
    detailPropertyController
}