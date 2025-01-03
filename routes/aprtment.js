var express = require('express')
const { getAllApartmentController, createApartmentController,getApartmentApproveForUser ,deleteApartmentController, editApartmentController, detailApartmentController, uploadImageController, deleteImageController, searchApartmentController, getAllKhoMua, getALlRequest, getAllKhoBan, getALlApprove, requestData, approveData, changeStatusApartment, importExcelApartmentController, removeReqAppController, exportExcelApartmentController } = require('../controllers/apartmentController')
var router = express.Router()

// @route GET investor
// @desct Lấy tất cả trục căn hộ
router.get('/', getAllApartmentController)
router.get('/khosale', getAllKhoBan)
router.get('/khomua', getAllKhoMua)
router.get('/request', getALlRequest)
router.get('/approve', getALlApprove)

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
router.post('/search', searchApartmentController)
router.post('/request-data', requestData)
router.post('/approve-data', approveData)
// @route Get all apartment for user approve
router.post('/approve-user', getApartmentApproveForUser)
router.post('/change-status', changeStatusApartment)

router.post('/import-excel', importExcelApartmentController)
router.post('/remove-request-approve', removeReqAppController)

// @route POST export excel apartment
// @desc Export excel apartment
router.post('/export-excel-apartment', exportExcelApartmentController)

module.exports = router