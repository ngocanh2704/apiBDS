var express = require("express");
const {
  getAllEmployeeController,
  createEmployeeController,
  deleteEmployeeController,
  editEmployeeController,
  detailEmployeeController,
} = require("../controllers/employeesController");
const { verifyToken } = require("../controllers/middleware/auth");
var router = express.Router();

 

//@router Get Employee
//@desc Get nhân viên
router.get("/" ,getAllEmployeeController);

router.post("/create" ,createEmployeeController);

router.post("/delete", deleteEmployeeController);

router.post("/edit", editEmployeeController);
router.post('/detail', detailEmployeeController)

module.exports = router;
