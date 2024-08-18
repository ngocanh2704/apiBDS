var express = require('express')
const { getAllApartmentController, createApartmentController, deleteApartmentController, editApartmentController, detailApartmentController, uploadImageController, deleteImageController, searchApartmentController } = require('../controllers/apartmentController')
var router =  express.Router()

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/',getAllApartmentController)

// @route POST create investor
// @desc Tạo mới trục căn hộ
router.post('/create', createApartmentController)

// @route POST delete investor
// @desc Xoá  căn hộ
router.post('/delete', deleteApartmentController)

// @route POST edit investor
// @desc Sửa trục căn hộ
router.post('/edit', editApartmentController)

router.post('/detail', detailApartmentController)

router.post('/upload', uploadImageController)
router.post('/delete-image', deleteImageController)
router.post('/search',searchApartmentController)

module.exports = router