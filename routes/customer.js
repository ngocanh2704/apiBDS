var express = require("express");
var router = express.Router();
const {
  createCustomerController,
  getCustomerController,
  deleteCustomerController,
} = require("../controllers/customerController");

router.get("/", getCustomerController);
//@route POST create customer
//@des tạo khách hàng mua hoặc thuê
router.post("/create", createCustomerController);

//@route POST delete customer
//@des xoá khách hàng mua hoặc thuê
router.post("/delete", deleteCustomerController);

module.exports = router;
