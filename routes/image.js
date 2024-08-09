var express = require('express')
const { getAllImageController, createImageController, deleteImageController, deleteImageIndexController, addImageIndexController } = require('../controllers/imageController')
const { checkLoggin } = require('../controllers/middleware/auth');
var router =  express.Router()

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/',checkLoggin ,getAllImageController)

// @route POST create investor
// @desc Tạo mới trục căn hộ
router.post('/create', checkLoggin,createImageController)

// // @route POST delete investor
// // @desc Xoá trục căn hộ
router.post('/delete', checkLoggin,deleteImageController)

// // @route POST edit investor
// // @desc Sửa trục căn hộ
// router.post('/edit', editStatusController)
router.post('/deleteImage', deleteImageIndexController)

router.post('/addImage', checkLoggin,addImageIndexController)

module.exports = router