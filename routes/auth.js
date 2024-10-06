require('dotenv').config()
var express = require('express')
var router = express.Router()
var argon2 = require('argon2')
var jwt = require('jsonwebtoken')

const Users = require('../models/Users')
const { getAllUserController } = require('../controllers/usersController')

// @route POST auth/register
// @desc Resgister User
// @accesss Public
router.post('/register',async (req,res)=>{
    const { username, password, status} = req.body
    // //simple validation
    if(!username || !password)
        return res.status(400).json({success: false, message: "Missing username and/or password"})


        const user =await Users.findOne({username})
        if(user){
            return res.status(400).json({success: false, message:"User name đã tồn tại"})
        }

        //All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new Users({
            username,
            password: hashedPassword,
            status: status
        })
        await newUser.save()

        const accessToken = jwt.sign({userId: newUser._id}, process.env.ACCESS_TOKEN_SECRET)
        res.json({success: true, message:"User đã được tạo thành công."})
})

// @route GET auth/user
// @desc