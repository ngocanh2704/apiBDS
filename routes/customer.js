var express = require("express");
var router = express.Router();
const {
  createCustomerController,
  getCustomerController,
} = require("../controllers/customerController");

router.get("/", getCustomerController);
//@route POST create customer
//@des tạo khách hàng mua hoặc thuê
router.post("/create", createCustomerController);

module.exports = router;
