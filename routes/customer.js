var express = require("express");
var router = express.Router();
const {
  createCustomerController,
  getCustomerController,
  deleteCustomerController,
  detailCustomerController,
  editCustomerController,
  searchCustomerController,
} = require("../controllers/customerController");

router.get("/", getCustomerController);
//@route POST create customer
//@des tạo khách hàng mua hoặc thuê
router.post("/create", createCustomerController);

//@route POST delete customer
//@des xoá khách hàng mua hoặc thuê
router.post("/delete", deleteCustomerController);

//@route POST get detail customer
//@des lấy thông tin customer
router.post('/detail', detailCustomerController)

//@route POST post edit customer
//@des sửa thông tin customer
router.post('/edit', editCustomerController)

//@route POST post find customer
//@des lọc thông tin customer
router.post('/search', searchCustomerController)

module.exports = router;
