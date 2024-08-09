var Owner = require('../models/Owner')

const getAllOwnerController = async (req,res) => {
    const allOwner = await Owner.find({isDelete: true})
    const user =   req.session.user
    res.render('owner', {data: allOwner,user:user})
}
const createOwnerController = async (req,res) => {
    const {husband_name, husband_phone_number,wife_name,wife_phone_number} = req.body
    const husbandName = await Owner.findOne({husband_name: husband_name})
    if(husbandName)
        return res.status(400).json({success: false, message: "Tên chồng đã tồn tại."})

    const newOwner = new Owner({
        husband_name: husband_name,
        husband_phone_number: husband_phone_number,
        wife_name: wife_name,
        wife_phone_number: wife_phone_number
    })

    await newOwner.save()
    res.json({success: true, message: "Chủ căn hộ đã được tạo thành công."})
}

const deleteOwnerController = async (req,res) => {
    const {id} = req.body
    const deleteOwner = await Owner.findByIdAndUpdate(id,{isDelete: false})
    res.json({success: true, message:"Chủ căn hộ đã được xoá."})
}

const editOwnerController = async (req, res) => {
    const {id, husband_name, husband_phone_number,wife_name, wife_phone_number} =req.body
    const husbandName = await Owner.findOne({husband_name: husband_name})
    if(husbandName)
        return res.status(400).json({success: false, message: "Tên chủ căn hộ đã tồn tại."})

    const editOwner = await Owner.findByIdAndUpdate(id, {
        husband_name: husband_name,
        husband_phone_number: husband_phone_number,
        wife_name: wife_name,
        wife_phone_number: wife_phone_number
    }, {
        new: true
    })
    res.json({success: true, message:"Tên chủ căn hộ đã được sửa."})
}

module.exports = {
    getAllOwnerController,
    createOwnerController,
    deleteOwnerController,
    editOwnerController
}