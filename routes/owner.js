var express = require('express')
const { getAllOwnerController, createOwnerController, deleteOwnerController, editOwnerController } = require('../controllers/ownerController')
var router =  express.Router()

// @route GET Owner
// @desct Lấy tất cả trục căn hộ
router.get('/',getAllOwnerController)

// @route create Owner
// @desc tạo mới chủ căn hộ
router.post('/create', createOwnerController)

// @route delete Owner
// @desc xoá chủ căn hộ
router.post('/delete', deleteOwnerController)

// @router edit Owner
// @desc sửa chủ căn hộ
router.post('/edit', editOwnerController)

module.exports = router