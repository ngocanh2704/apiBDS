const Users = require("../models/Users");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const Employees = require("../models/Employees");
require("dotenv").config();

const getAllUserController = async (req, res) => {
  const allUser = await Users.find({ isDelete: false }).populate("employee_ID");
  const employees = await Employees.find();
  res.json({ success: true, user: allUser, dataEmployee: employees });
};

const createUserController = async (req, res) => {
  const { username, password, status, employee_ID, role } = req.body;
  // //simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  const user = await Users.findOne({ username });
  if (user) {
    return res
      .status(400)
      .json({ success: false, message: "User name đã tồn tại" });
  }

  //All good
  const hashPassword = bcrypt.hashSync(password, 10);
  const newUser = new Users({
    username,
    password: hashPassword,
    status: status,
    employee_ID: employee_ID,
    role: role,
  });
  await newUser.save();
  res.json({ success: true, message: "User đã được tạo thành công." });
};

const deleteUserController = async (req, res) => {
  const { id } = req.body;
  const deleteUser = await Users.findByIdAndUpdate(id, { isDelete: true });
  res.json({ success: true, message: "User đã được xoá." });
};

const editUserController = async (req, res) => {
  const { id, username, password, status, employee_ID, role } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const user = await Users.findByIdAndUpdate(
    id,
    {
      username: username,
      password: hashPassword,
      status: status,
      employee_ID: employee_ID,
      role: role,
    },
    { new: true }
  );
  res.json({ success: true, message: "User đã được sửa." });
};

const loginUserController = async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ username: username, isDelete: false });

  if (!user) {
    return res.status(401).send("Tên đăng nhập không tồn tại.");
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Mật khẩu không chính xác.");
  }

  const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });

  res.json({
    success: true,
    message: "Đăng nhập thành công",
    accessToken,
    user
  });
};

const detailUserController = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const user = await Users.findById(id, { isDelete: false }).populate(
    "employee_ID"
  );
  if (!user) {
    res.status(400);
  }
  res.json({ success: true, user });
};

module.exports = {
  getAllUserController,
  createUserController,
  deleteUserController,
  editUserController,
  loginUserController,
  detailUserController,
};
