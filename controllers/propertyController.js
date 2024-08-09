const Property = require("../models/Property")

const getAllPropertyController = async (req,res) => {
    const allInvestor = await Property.find({isDelete: true})
    const user =   req.session.user
    res.render('property', {data: allInvestor,user: user})
}

const createPropertyController = async (req,res) => {
    const {property_name} = req.body
    const propertyName = await Property.findOne({property_name: property_name})
    if(propertyName)
        return res.status(400).json({success: false, message: "Tên trục căn hộ đã tồn tại."})

    const newProperty = new Property({
        property_name:property_name
    })

    await newProperty.save()
    res.json({success: true, message:"Trục căn hộ đã được tạo."})
}

const deletePropertyController = async (req,res) => {
    const {id} = req.body
    const deleteProperty = await Property.findByIdAndUpdate(id,{isDelete:false})
    res.json({success: true, message:"Trục căn hộ đã được xoá."})
}

const editPropertyController = async (req,res) => {
    const {id, property_name} = req.body
    const propertyName = await Property.findOne({property_name: property_name})
    if(propertyName){
        return res.status(400).json({success: false, message: "Trục căn hộ đã tồn tại vui lòng tạo trục căn hộ khác."})
    }

    const editProperty = await Property.findByIdAndUpdate(id,{
        property_name: property_name
    }, {new: true})
    res.json({success: true, message:"Trục căn hộ đã được sửa."})
}

module.exports = {
    getAllPropertyController,
    createPropertyController,
    deletePropertyController,
    editPropertyController
}