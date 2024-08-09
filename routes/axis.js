var express = require('express')
const { getAllAxisController, createAxisController, deleteAxisController, editAxisController, detailAxisController } = require('../controllers/axisController')
const { checkLoggin } = require('../controllers/middleware/auth')
var router =  express.Router()

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/',getAllAxisController)

// @route POST create investor
// @desc Tạo mới trục căn hộ
router.post('/create', createAxisController)

// @route POST delete investor
// @desc Xoá trục căn hộ
router.post('/delete', deleteAxisController)

// @route POST edit investor
// @desc Sửa trục căn hộ
router.post('/edit',editAxisController)

router.post('/detail',detailAxisController)

module.exports = router