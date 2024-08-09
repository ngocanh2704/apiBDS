var express = require('express')
const { getAllEmploymentStatusController, createEmploymentStatusController, deleteEmploymentStatusController, editEmploymentStatusController } = require('../controllers/employmentStatusController')
const { checkLoggin } = require('../controllers/middleware/auth')
var router = express.Router()

router.get('/',checkLoggin,getAllEmploymentStatusController)

router.post('/create',checkLoggin, createEmploymentStatusController)

router.post('/edit',checkLoggin, editEmploymentStatusController)

router.post('/delete', checkLoggin,deleteEmploymentStatusController)

module.exports = router