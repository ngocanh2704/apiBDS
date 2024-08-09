const Utility = require("../models/Util")

const getAllUtilityController = async (req,res) => {
    const allUtility = await Utility.find({isDelete: false})
    const user =   req.session.user
    res.render('utility', {data: allUtility,user: user})
}

const createUtilityController = async (req,res) => {
    const {utility_name} = req.body
    const utilityName = await Utility.findOne({utility_name: utility_name})
    if(utilityName)
        return res.status(400).json({success: false, message: "Tên tiện ích đã tồn tại."})

    const newUtility = new Utility({
        utility_name:utility_name
    })

    await newUtility.save()
    res.json({success: true, message:"Tiện ích đã được tạo."})
}

const deleteUtilityController = async (req,res) => {
    const {id} = req.body
    const deleteUtility = await Utility.findByIdAndUpdate(id,{isDelete:false})
    res.json({success: true, message:"Tiện ích đã được xoá."})
}

const editUtilityController = async (req,res) => {
    const {id, utility_name} = req.body
    const utilityName = await Utility.findOne({utility_name: utility_name})
    if(utilityName){
        return res.status(400).json({success: false, message: "Tiện ích đã tồn tại vui lòng tạo tiện ích khác."})
    }

    const editUtility = await Utility.findByIdAndUpdate(id,{
        utility_name: utility_name
    }, {new: true})
    res.json({success: true, message:"Tiện ích đã được sửa."})
}

module.exports = {
    getAllUtilityController,
    createUtilityController,
    deleteUtilityController,
    editUtilityController
}