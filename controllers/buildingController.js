const Building = require('../models/Building')
const Project = require('../models/Project')

const getAllBuildingController = async (req,res) => {
    const allBuilding = await Building.find({isDelete: false}).populate('project')
    const allProject = await Project.find({isDelete: false})
    const user =   req.session.user
   res.json({success: true, data: allBuilding})
}

const createBuildingController = async (req,res) => {
    const {building_name,floor,project} = req.body
    const buildingName = await Project.findOne({building_name: building_name})
    if(buildingName)
        return res.status(400).json({success: false, message: "Tên toà nhà đã tồn tại."})

    const newBuilding = new Building({
        building_name:building_name,
        floor: floor,
        project: project
    })

    await newBuilding.save()
    res.json({success: true, message:"Toà nhà đã được tạo đã được tạo."})
}

const deleteBuildingController = async (req,res) => {
    const {id} = req.body
    const deleteBuilding = await Building.findByIdAndDelete(id)
    res.json({success: true, message:"Toà dự án đã được xoá."})
}

const editBuildingController = async (req,res) => {
    const {building_name,floor,project,id} = req.body


    const editBuilding = await Building.findByIdAndUpdate(id,{
        building_name:building_name,
        floor: floor,
        project: project
    }, {new: true})
    res.json({success: true, message:"Toà dự án đã được sửa."})
}

const detailBuildingController =  async (req,res) => {
    const {id} = req.body
    const detail = await Building.findById(id,{isDelete: false})
        res.json({success: true, building: detail})
}


module.exports = {
    getAllBuildingController,
    createBuildingController,
    deleteBuildingController,
    editBuildingController,detailBuildingController
}