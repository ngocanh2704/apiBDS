var express = require('express');
const { createData, deleteData, editData, requestData, getAllKhoSale, getALlKhoBan, getALlRequest, approveData, getALlApprove } = require('../controllers/indexController');
var router = express.Router();

/* GET home page. */
router.get('/khosale' ,getAllKhoSale)
router.get('/khoretal' ,getALlKhoBan)
router.get('/request' ,getALlRequest)
router.post('/approve' ,getALlApprove)

router.post('/create',createData)

router.post('/delete', deleteData)

router.post('/edit', editData)

router.post('/request-data', requestData)
router.post('/approve-data' ,approveData)

module.exports = router;