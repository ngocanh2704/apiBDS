var express = require('express')
const { getAllBalconyDirectionController, createBalconyDirectionController, deleteBalconyDirectionController, editBalconyDirectionController, detailBalconyDirectionController } = require('../controllers/balconyDirectionController')
var router =  express.Router()

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/',getAllBalconyDirectionController)

// @route POST create investor
// @desc Tạo mới trục căn hộ
router.post('/create', createBalconyDirectionController)

// @route POST delete investor
// @desc Xoá trục căn hộ
router.post('/delete', deleteBalconyDirectionController)

// @route POST edit investor
// @desc Sửa trục căn hộ
router.post('/edit', editBalconyDirectionController)

router.post('/detail', detailBalconyDirectionController)

module.exports = router