var express = require('express')
var router =  express.Router()

const { getAllBuildingController, createBuildingController, editBuildingController, deleteBuildingController } = require('../controllers/buildingController')
const { checkLoggin } = require('../controllers/middleware/auth')

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/',checkLoggin, getAllBuildingController)

// @route POST create investor
// @desc Tạo mới trục căn hộ
router.post('/create',checkLoggin, createBuildingController)

// // @route POST delete investor
// // @desc Xoá trục căn hộ
router.post('/delete',checkLoggin ,deleteBuildingController)

// // @route POST edit investor
// // @desc Sửa trục căn hộ
router.post('/edit', checkLoggin ,editBuildingController)

module.exports = router