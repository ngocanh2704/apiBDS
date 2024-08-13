var express = require('express')
const { getAllImageController, createImageController, deleteImageController, deleteImageIndexController, addImageIndexController } = require('../controllers/imageController')
var router =  express.Router()

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/' ,getAllImageController)

// @route POST create investor
// @desc Tạo mới trục căn hộ
router.post('/create',createImageController)

// // @route POST delete investor
// // @desc Xoá trục căn hộ
router.post('/delete',deleteImageController)

// // @route POST edit investor
// // @desc Sửa trục căn hộ
// router.post('/edit', editStatusController)
router.post('/deleteImage', deleteImageIndexController)

router.post('/addImage',addImageIndexController)

module.exports = router