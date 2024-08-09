var Employees = require("../models/Employees");
var EmploymentStatus = require("../models/EmploymentStatus");
var path = require("path");

const createEmployeeController = async (req, res) => {
  const {
    employee_name,
    start_date,
    gender,
    phone_number,
    email_address,
    dob,
    employment_status_id,
  } = req.body;
  const employeeName = await Employees.findOne({employee_name: employee_name, isDelete: false})
  if(employeeName){
    return res.status(400).json({success: false, message: 'Tên nhân viên đã tồn tại trong hệ thống.'})
  }
  var Urls = null
  if (req.files) {
    const image = req.files.cccd_image;
    if (Array.isArray(image)){
      image.forEach((element) => {
        element.mv(
          path.join(__dirname, "../public/upload/") + employee_name + element.name
        );
    })
    } else {
      image.mv(
        path.join(__dirname, "../public/upload/") + employee_name + image.name
      );
      Urls = '/upload/' + employee_name + image.name
    }
  } else {
    Urls = "/upload/noimage.jpg";
  }
    const newEmployee = new Employees({
      employee_name: employee_name,
      start_date: start_date,
      gender: gender,
      phone_number: phone_number,
      email_address: email_address,
      dob: dob,
      employment_status_id: employment_status_id,
      cccd_image: Urls
    });
    await newEmployee.save();
  res.json({ success: true, message: "Nhân viên đã được tạo." });
};

const getAllEmployeeController = async (req, res) => {
  const allEmployee = await Employees.find({ isDelete: false }).populate(
    "employment_status_id"
  );
  const allEmploymentStatus = await EmploymentStatus.find({ isDelete: false });
  // console.log(allEmployee)
  // res.send(allEmployee)
  res.json({
    success: true,
    message: "Danh sách nhân viên",
    data: allEmployee,
    dataStatus : allEmploymentStatus
  });
};

const deleteEmployeeController = async (req, res) => {
  const { id } = req.body;
  const deleteEmployee = await Employees.findByIdAndDelete(id);
  res.json({ success: true, message: "Nhân viên đã được xoá." });
};

const editEmployeeController = async (req, res) => {
  const {
    employee_name,
    start_date,
    gender,
    phone_number,
    email_address,
    dob,
    employment_status_id,
    id,
  } = req.body;
  const employeename = await Employees.findById(id);
  var Urls = null
  if (req.files) {
    const { cccd_image } = req.files;
    // image_cccd.mv(
    //   path.join(__dirname, "../public/upload/") + employeeName + ".png"
    // );const image = req.files.cccd_image;
    console.log(req.files)
    if (Array.isArray(cccd_image)){
      cccd_image.forEach((element) => {
        element.mv(
          path.join(__dirname, "../public/upload/") + employee_name + element.name
        );
    })
    } else {
      cccd_image.mv(
        path.join(__dirname, "../public/upload/") + employee_name + cccd_image.name
      );

      Urls = '/upload/' + employee_name + cccd_image.name
    }
  } else {
    Urls =  employeename.cccd_image;
  }
  const newEmployee = await Employees.findByIdAndUpdate(
    id,
    {
      employee_name: employee_name,
      start_date: start_date,
      gender: gender,
      phone_number: phone_number,
      email_address: email_address,
      dob: dob,
      employment_status_id: employment_status_id,
      cccd_image: Urls,
    },
    { new: true }
  );
  // const addEmployee = await Employees.findOneAndUpdate(newEmployee._id, {
  //     cccd_image: newEmployee._id+'.png'
  // }, {new: true})
  // // If doesn't have image mime type prevent from uploading
  // if (!/^image/.test(image_cccd.mimetype)) return res.sendStatus(400);

  // // Move the uploaded image to our upload folder

  // // All good
  // res.sendStatus(200);
  res.json({ success: true, message: "Nhân viên đã được sửa." });
};

const detailEmployeeController = async (req, res) => {
  const {id} =  req.body
  const employee = await Employees.findById(id,{isDelete: false})
  if(employee){
    res.json({ success: true, message: "Nhân viên đã được tìm thấy.", employee });
  } else {
    return res.status(400).json({success: false, message: 'Nhân viên không tồn tại trong hệ thống.'})
  }
}

module.exports = {
  getAllEmployeeController,
  createEmployeeController,
  deleteEmployeeController,
  editEmployeeController,
  detailEmployeeController
};
