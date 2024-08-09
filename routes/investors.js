var express = require('express')
const { getAllInvestorController, createInvestorController, deleteInvestorController, editInvestorController } = require('../controllers/investorController')
const { checkLoggin } = require('../controllers/middleware/auth')
var router =  express.Router()

// @route GET investor
// @desct Lấy tất cả chủ đầu tư
router.get('/',checkLoggin,getAllInvestorController)

// @route POST create investor
// @desc Tạo mới chủ đầu tư
router.post('/create', checkLoggin,createInvestorController)

// @route POST delete investor
// @desc Xoá chủ đầu tư
router.post('/delete',checkLoggin, deleteInvestorController)

// @route POST edit investor
// @desc Sửa chủ đầu tư
router.post('/edit', checkLoggin,editInvestorController)

module.exports = router