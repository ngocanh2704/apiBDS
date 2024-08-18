var express = require('express')
const { getAllFurnishedController, createFurnishedController, deleteFurnishedController, editFurnishedController, detailFurnishedController } = require('../controllers/furnishedController')
var router =  express.Router()

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/',getAllFurnishedController)

// @route POST create investor
// @desc Tạo mới trục căn hộ
router.post('/create', createFurnishedController)

// @route POST delete investor
// @desc Xoá trục căn hộ
router.post('/delete', deleteFurnishedController)

// // @route POST edit investor
// // @desc Sửa trục căn hộ
router.post('/edit',editFurnishedController)

router.post('/detail',detailFurnishedController)

module.exports = router