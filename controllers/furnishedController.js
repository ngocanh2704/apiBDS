const Furnished = require('../models/Furnished')

const getAllFurnishedController = async (req,res) => {
    const allInvestor = await Furnished.find({isDelete: false})
    console.log(allInvestor)
res.json({success: true, data: allInvestor})
}

const createFurnishedController = async (req,res) => {
    const {furnished_name} = req.body
    const axisName = await Furnished.findOne({furnished_name: furnished_name})
    if(axisName)
        return res.status(400).json({success: false, message: "Tên trục căn hộ đã tồn tại."})

    const newAxis = new Furnished({
        furnished_name:furnished_name
    })

    await newAxis.save()
    res.json({success: true, message:"Trục căn hộ đã được tạo."})
}

const deleteFurnishedController = async (req,res) => {
    const {id} = req.body
    const deleteAxis = await Furnished.findByIdAndDelete(id)
    res.json({success: true, message:"Trục căn hộ đã được xoá."})
}

const editFurnishedController = async (req,res) => {
    const {id, furnished_name} = req.body
    const axisName = await Furnished.findOne({furnished_name: furnished_name})
    if(axisName){
        return res.status(400).json({success: false, message: "Trục căn hộ đã tồn tại vui lòng tạo trục căn hộ khác."})
    }

    const editAxis = await Furnished.findByIdAndUpdate(id,{
        furnished_name: furnished_name
    }, {new: true})
    res.json({success: true, message:"Trục căn hộ đã được sửa."})
}

const detailFurnishedController =  async (req,res) => {
    const {id} = req.body
    const detail = await Furnished.findById(id,{isDelete: false})
        res.json({success: true, data: detail})
}

module.exports = {
    getAllFurnishedController,
    createFurnishedController,
    deleteFurnishedController,
    editFurnishedController,
    detailFurnishedController
}