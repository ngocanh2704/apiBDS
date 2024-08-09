var express = require('express');
const { checkLoggin } = require('../controllers/middleware/auth');
const { getAll, createData, deleteData, editData, requestData, getAllKhoSale, getALlKhoBan, getALlRequest, approveData, getALlApprove } = require('../controllers/indexController');
var router = express.Router();

/* GET home page. */
router.get('/' ,getAll)
router.get('/khosale' ,getAllKhoSale)
router.get('/khoretal' ,getALlKhoBan)
router.get('/request' ,getALlRequest)
router.post('/approve' ,getALlApprove)

router.post('/create',createData)

router.post('/delete', deleteData)

router.post('/edit', editData)

router.post('/request', requestData)
router.post('/approve' ,approveData)

module.exports = router;