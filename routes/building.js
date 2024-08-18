var express = require('express')
var router =  express.Router()

const { getAllBuildingController, createBuildingController, editBuildingController, deleteBuildingController, detailBuildingController } = require('../controllers/buildingController')

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/', getAllBuildingController)

// @route POST create investor
// @desc Tạo mới trục căn hộ
router.post('/create', createBuildingController)

// // @route POST delete investor
// // @desc Xoá trục căn hộ
router.post('/delete',  deleteBuildingController)

// // @route POST edit investor
// // @desc Sửa trục căn hộ
router.post('/edit',  editBuildingController)

router.post('/detail',  detailBuildingController)

module.exports = router