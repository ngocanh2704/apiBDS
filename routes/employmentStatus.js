var express = require('express')
const { getAllEmploymentStatusController, createEmploymentStatusController, deleteEmploymentStatusController, editEmploymentStatusController } = require('../controllers/employmentStatusController')
var router = express.Router()

router.get('/',getAllEmploymentStatusController)

router.post('/create', createEmploymentStatusController)

router.post('/edit', editEmploymentStatusController)

router.post('/delete',deleteEmploymentStatusController)

module.exports = router