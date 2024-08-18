var express = require('express')
const { getAllPropertyController, createPropertyController, deletePropertyController, editPropertyController, detailPropertyController } = require('../controllers/propertyController')
var router =  express.Router()

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/',getAllPropertyController)

// @route POST create investor
// @desc Tạo mới trục căn hộ
router.post('/create', createPropertyController)

// @route POST delete investor
// @desc Xoá trục căn hộ
router.post('/delete',deletePropertyController)

// @route POST edit investor
// @desc Sửa trục căn hộ
router.post('/edit', editPropertyController)

router.post('/detail', detailPropertyController)

module.exports = router