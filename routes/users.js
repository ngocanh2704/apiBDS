require('dotenv').config()
var express = require('express')
var router = express.Router()

const { getAllUserController, createUserController, deleteUserController, editUserController, detailUserController } = require('../controllers/usersController')

// @route GET user
// @desc
router.get('/', getAllUserController)

// @route POST user/register
// @desc Resgister User
router.post('/register', createUserController)

// @route POST user/edit
router.post('/edit', editUserController)

//@route DELETE user
//@desc Xoá tài khoản
router.post('/delete', deleteUserController)

router.post('/detail', detailUserController)


module.exports = router