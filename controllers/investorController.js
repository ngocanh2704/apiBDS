const Investors = require('../models/Investors')

const getAllInvestorController = async (req,res) => {
    const allInvestor = await Investors.find({isDelete: true})
    const user =   req.session.user
    res.render('investor', {data: allInvestor,user:user})
}

const createInvestorController = async (req,res) => {
    const {investor_name} = req.body
    const investorName = await Investors.findOne({investor_name: investor_name})
    if(investorName)
        return res.status(400).json({success: false, message: "Tên chủ đầu tư đã tồn tại."})

    const newInvestor = new Investors({
        investor_name:investor_name
    })

    await newInvestor.save()
    res.json({success: true, message:"Chủ đầu tư đã được tạo."})
}

const deleteInvestorController = async (req,res) => {
    const {id} = req.body
    const deleteInvestor = await Investors.findByIdAndUpdate(id,{isDelete:false})
    res.json({success: true, message:"Chủ đầu tư đã được xoá."})
}

const editInvestorController = async (req,res) => {
    const {id, investor_name} = req.body
    const investorName = await Investors.findOne({investor_name: investor_name})
    if(investorName){
        return res.status(400).json({success: false, message: "Tên chủ đầu tư đã tồn tại vui lòng tạo chủ đầu tư khác khác."})
    }

    const editInvestor = await Investors.findByIdAndUpdate(id,{
        investor_name: investor_name
    }, {new: true})
    res.json({success: true, message:"Tên chủ đầu tư đã được sửa."})
}

module.exports = {
    getAllInvestorController,
    createInvestorController,
    deleteInvestorController,
    editInvestorController
}