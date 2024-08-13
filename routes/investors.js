var express = require('express')
const { getAllInvestorController, createInvestorController, deleteInvestorController, editInvestorController } = require('../controllers/investorController')
var router =  express.Router()

// @route GET investor
// @desct Lấy tất cả chủ đầu tư
router.get('/',getAllInvestorController)

// @route POST create investor
// @desc Tạo mới chủ đầu tư
router.post('/create', createInvestorController)

// @route POST delete investor
// @desc Xoá chủ đầu tư
router.post('/delete', deleteInvestorController)

// @route POST edit investor
// @desc Sửa chủ đầu tư
router.post('/edit', editInvestorController)

module.exports = router