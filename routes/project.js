var express = require('express')
const { getAllProjectController, createProjectController, deleteProjectController, editProjectController, detailProjectController } = require('../controllers/projectController')
const { checkLoggin } = require('../controllers/middleware/auth')
var router = express.Router()

// @route Get Project
// @desc lấy tất cả project
router.get('/', getAllProjectController)

// @route Post Create Project
// @desc tạo mới project
router.post('/create', createProjectController)

// @route Delete Project
// @desc Xoá dự án
router.post('/delete', deleteProjectController)

// @route Edit Project
// @desc Sửa dự án
router.post('/edit', editProjectController)

router.post('/detail', detailProjectController)

module.exports = router