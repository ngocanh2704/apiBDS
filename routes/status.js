var express = require('express')
const { getAllStatusController, createStatusController, deleteStatusController, editStatusController, detailStatusController } = require('../controllers/statusController')
var router =  express.Router()

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/',getAllStatusController)

// @route POST create investor
// @desc Tạo mới trục căn hộ
router.post('/create', createStatusController)

// @route POST delete investor
// @desc Xoá trục căn hộ
router.post('/delete', deleteStatusController)

// @route POST edit investor
// @desc Sửa trục căn hộ
router.post('/edit', editStatusController)

router.post('/detail', detailStatusController)

module.exports = router