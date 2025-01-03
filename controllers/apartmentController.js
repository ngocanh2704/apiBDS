const Apartment = require("../models/Apartment");
var path = require("path");
const fs = require("fs");
const Users = require("../models/Users");
const ApartmentUser = require("../models/ApartmentUser");
var XLSX = require("xlsx");
const Project = require("../models/Project");
const Building = require("../models/Building");
const Axis = require("../models/Axis");
const Properties = require("../models/Properties");
const BalconyDirection = require("../models/BalconyDirection");
const Furnished = require("../models/Furnished");
var jwt = require("jsonwebtoken");
const CryptoJS = require('crypto-js');
require("dotenv").config();

const PAGE_SIZE = 50;

const getAllApartmentController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;
  const allApartment = await Apartment.find()
    .populate("project")
    .populate("building")
    .populate("properties")
    .populate("balcony_direction")
    .populate("furnished")
    .populate("axis")
    .populate({
      path: "user_id",
      populate: [{ path: "employee_ID" }],
    })
    .sort({ status: -1, _id: -1 })
    .skip(skip)
    .limit(limit)
  var total_page = await Apartment.countDocuments();
  //Mã hoá dữ liệu
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(allApartment),
    process.env.ACCESS_TOKEN_SECRET
  ).toString();
  res.json({ success: true, data: encryptedData, total_page: total_page, page });
};

const getAllKhoBan = async (req, res) => {
  const allApartmentSalePrice = await Apartment.find({
    isDelete: false,
    sale_price: { $gt: 0 },
  })
    .populate("project")
    .populate("building")
    .populate("properties")
    .populate("balcony_direction")
    .populate("furnished")
    .populate("axis");

  res.json({ success: true, data: allApartmentSalePrice });
};

const createApartmentController = async (req, res) => {
  const {
    apartment_name,
    area,
    axis,
    balconies,
    balcony_direction,
    bathrooms,
    bedrooms,
    building,
    last_updated,
    notes,
    owner,
    phone_number,
    project,
    property,
    rental_price,
    sale_price,
    status,
    floor,
    furnished,
    available_from,
    available_until,
    color,
  } = req.body;

  const checkApartment = await Apartment.findOne({
    project: project,
    apartment_name: apartment_name,
  });
  if (checkApartment) {
    return res
      .status(500)
      .json({ success: false, message: "Căn hộ đã tồn tại." });
  }

  const newApartment = new Apartment({
    apartment_name: apartment_name,
    building: building,
    phone_number: phone_number,
    project: project,
    axis: axis,
    owner: owner,
    properties: property,
    floor: floor,
    area: area,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    sale_price: sale_price,
    rental_price: rental_price,
    available_from: available_from,
    available_until: available_until,
    furnished: furnished,
    balconies: balconies,
    balcony_direction: balcony_direction,
    last_updated: last_updated,
    status: status,
    notes: notes,
    color: color,
  });

  const newApartmentAll = await newApartment.save();
  const findApartment = await Apartment.findById(newApartmentAll._id)
    .populate("project")
    .populate("building")
    .populate("properties")
    .populate("balcony_direction")
    .populate("furnished")
    .populate("axis");

  res.json({
    success: true,
    message: "Căn hộ đã được tạo.",
    data: findApartment,
  });
};

const deleteApartmentController = async (req, res) => {
  const { id } = req.body;
  const checkApartmentUser = await ApartmentUser.find({ user: id });
  if (checkApartmentUser.length > 0) {
    return res.json({ success: false, message: "Căn hộ đã được yêu cầu." });
  }
  const deleteStatus = await Apartment.findByIdAndDelete(id);
  return res.json({ success: true, message: "Căn hộ đã được xoá." });
};

const editApartmentController = async (req, res) => {
  const {
    apartment_name: apartment_name,
    id,
    building,
    axis,
    balconies,
    balcony_direction,
    bathrooms,
    bedrooms,
    floor,
    notes,
    owner,
    phone_number,
    project,
    last_updated,
    property,
    rental_price,
    sale_price,
    status,
    available_from,
    available_until,
    area,
    furnished,
    color,
    user,
  } = req.body;

  const editApartment = await Apartment.findByIdAndUpdate(
    id,
    {
      apartment_name: apartment_name,
      building: building,
      phone_number: phone_number,
      project: project,
      axis: axis,
      owner: owner,
      properties: property,
      floor: floor,
      area: area,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      sale_price: sale_price,
      rental_price: rental_price,
      available_from: available_from,
      available_until: available_until,
      furnished: furnished,
      balconies: balconies,
      balcony_direction: balcony_direction,
      last_updated: last_updated,
      status: status,
      notes: notes,
      color: color,
      user_id: user,
    },
    { new: true }
  );

  const findApartment = await Apartment.findById(id)
    .populate("project")
    .populate("building")
    .populate("properties")
    .populate("balcony_direction")
    .populate("furnished")
    .populate("axis")
    .populate({
      path: "user_id",
      populate: [{ path: "employee_ID" }],
    });
  res.json({
    success: true,
    message: "Căn hộ đã được sửa.",
    data: findApartment,
  });
};

const detailApartmentController = async (req, res) => {
  const { id } = req.body;
  const detail = await Apartment.findById(id, { isDelete: false })
    .populate("project")
    .populate("axis")
    .populate("balcony_direction")
    .populate("status")
    .populate("furnished");
  res.json({ success: true, detail });
};

const uploadImageController = async (req, res) => {
  const { files } = req.files;
  const { id } = req.body;
  const image = await Apartment.findById(id, { isDelete: false });
  var arr = image.image;
  if (image.image.length >= 0) {
    if (Array.isArray(files)) {
      files.forEach((file) => {
        var stt = image.image.length + 1;
        file.mv(path.join(__dirname, "../public/upload/") + id + stt + ".png");
        arr.push("/upload/" + id + stt + ".png");
      });
    } else {
      var stt = image.image.length + 1;
      files.mv(path.join(__dirname, "../public/upload/") + id + stt + ".png");
      arr.push("/upload/" + id + stt + ".png");
    }
  }
  const updateImage = await Apartment.findByIdAndUpdate(id, {
    image: arr,
  });
  res.json({ succses: true, message: "Upload thành công", image: arr });
};

const deleteImageController = async (req, res) => {
  const { id, name } = req.body;
  const image = await Apartment.findById(id, { isDelete: false });
  var arr = image.image;
  var index = arr.indexOf("/upload/" + name);
  if (index > -1) {
    arr.splice(index, 1);
  }
  const updateImage = await Apartment.findByIdAndUpdate(id, {
    image: arr,
  });
  var filePath = path.join(__dirname, "../public/upload/") + name;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }
  });
  res.json({ success: true, message: "Đã xoá thành công" });
};

const searchApartmentController = async (req, res) => {
  var {
    project_id,
    building_id,
    furnished,
    property_id,
    balconyDirection_id,
    bedrooms,
    axis_id,
    key,
    isDelete,
    sale_price,
    rental_price,
    price,
    page,
  } = req.body;
  page = parseInt(page);
  if (page < 1) {
    page = 1;
  }
  var countSkip = (page - 1) * PAGE_SIZE;
  const projection = {
    project: project_id,
    building: building_id,
    furnished: furnished,
    properties: property_id,
    balcony_direction: balconyDirection_id,
    bedrooms: bedrooms,
    axis: axis_id,
    isDelete,
    sale_price: sale_price,
    rental_price: rental_price,
  };
  const conditions = Object.keys(projection).reduce((result, key) => {
    if (projection[key]) {
      result[key] = projection[key];
    }
    return result;
  }, {});
  // const total_page = await Apartment.countDocuments(conditions);
  var total_page = null;
  var statusPrice = { 1: 1, 2: -1, 3: 1, 4: -1 };
  var findApartment = "";
  if ((price == 1) | (price == 2)) {
    total_page = await Apartment.countDocuments({
      isDelete: false,
      sale_price: { $gt: 0 },
    });
    findApartment = await Apartment.find(conditions)
      .populate("project")
      .populate("building")
      .populate("properties")
      .populate("balcony_direction")
      .populate("furnished")
      .populate("axis")
      .populate({
        path: "user_id",
        populate: [{ path: "employee_ID" }],
      })
      .skip(countSkip)
      .limit(PAGE_SIZE)
      .sort({ status: -1, sale_price: statusPrice[price] });
  } else if ((price == 3) | (price == 4)) {
    total_page = await Apartment.countDocuments({
      isDelete: false,
      rental_price: { $gt: 0 },
    });
    findApartment = await Apartment.find(conditions)
      .populate("project")
      .populate("building")
      .populate("properties")
      .populate("balcony_direction")
      .populate("furnished")
      .populate("axis")
      .populate({
        path: "user_id",
        populate: [{ path: "employee_ID" }],
      })
      .skip(countSkip)
      .limit(PAGE_SIZE)
      .sort({ status: -1, rental_price: statusPrice[price] });
  } else {
    total_page = await Apartment.countDocuments(conditions);
    findApartment = await Apartment.find(conditions)
      .populate("project")
      .populate("building")
      .populate("properties")
      .populate("balcony_direction")
      .populate("furnished")
      .populate("axis")
      .populate({
        path: "user_id",
        populate: [{ path: "employee_ID" }],
      })
      .skip(countSkip)
      .limit(PAGE_SIZE)
      .sort({ status: -1 });
  }

  res.json({
    success: true,
    data: findApartment,
    total_page: total_page,
    page,
  });
};

const getAllKhoMua = async (req, res) => {
  const allApartmentRentalPrice = await Apartment.find({
    isDelete: false,
    rental_price: { $gt: 0 },
  })
    .populate("owner")
    .populate("properties")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("furnished")
    .populate("axis")
    .populate("building")
    .sort({ status: -1 });
  res.json({ success: true, data: allApartmentRentalPrice });
};

const getALlRequest = async (req, res) => {
  const allApartmentRequest = await ApartmentUser.find({
    isRequest: false,
  }).populate({
    path: "apartment",
    options: { sort: { status: -1 } },
    populate: [
      { path: "project" },
      { path: "axis" },
      { path: "building" },
      { path: "properties" },
      { path: "balcony_direction" },
    ],
  });
  var arr = allApartmentRequest.filter(function (item) {
    return item.apartment !== null;
  });
  res.json({ success: true, data: arr });
};

const getALlApprove = async (req, res) => {
  const allApartmentApprove = await ApartmentUser.find({
    isRequest: true,
  }).populate({
    path: "apartment",
    options: { sort: { status: -1 } },
    populate: [
      { path: "project" },
      { path: "axis" },
      { path: "building" },
      { path: "properties" },
      { path: "balcony_direction" },
    ],
  });
  var arr = allApartmentApprove.filter(function (item) {
    return item.apartment !== null;
  });
  res.json({ success: true, data: arr });
};
const requestData = async (req, res) => {
  const { id, user } = req.body;
  var checkRequest = await ApartmentUser.find({ apartment: id, user: user });
  if (checkRequest.length) {
    return res.json({ success: false, message: "Căn hộ yêu cầu đã tồn tại." });
  }
  const newApartment = new ApartmentUser({
    apartment: id,
    user: user,
  });

  await newApartment.save();

  res.json({ success: true, message: "Căn hộ đã đã được yêu cầu " });
};

const approveData = async (req, res) => {
  const { id } = req.body;
  const approveData = await ApartmentUser.findByIdAndUpdate(
    id,
    { isRequest: true },
    { new: true }
  );
  res.json({
    success: true,
    data: approveData,
    message: "Căn hộ đã đã được duyệt",
  });
};

const getApartmentApproveForUser = async (req, res) => {
  const { user, role } = req.body;
  var get = "";
  if (role == "staff") {
    get = await ApartmentUser.find({ user: user, isRequest: true }).populate({
      path: "apartment",
      options: { sort: { status: 1 } },
      populate: [
        { path: "project" },
        { path: "axis" },
        { path: "building" },
        { path: "properties" },
        { path: "balcony_direction" },
      ],
    });
  } else {
    get = await ApartmentUser.find({ isRequest: true }).populate({
      path: "apartment",
      options: { sort: { status: 1 } },
      populate: [
        { path: "project" },
        { path: "axis" },
        { path: "building" },
        { path: "properties" },
        { path: "balcony_direction" },
      ],
    });
  }
  res.json({ success: true, data: get });
};
const changeStatusApartment = async (req, res) => {
  const { id, status } = req.body;
  if (status == true) {
    const findStatus = await Apartment.findByIdAndUpdate(
      id,
      { status: status, color: "#ffffff" },
      { new: true }
    );
    res.json({
      success: true,
      message: "Đã thay đổi trạng thái!",
      data: findStatus,
    });
  } else {
    const findStatus = await Apartment.findByIdAndUpdate(
      id,
      { status: status, color: "#bfbfbf" },
      { new: true }
    );
    res.json({
      success: true,
      message: "Đã thay đổi trạng thái!",
      data: findStatus,
    });
  }
};

const importExcelApartmentController = async (req, res) => {
  const { file } = req.files;

  const header = [
    "project_name",
    "building_name",
    "floor",
    "axis_name",
    "owner",
    "phone_number",
    "property_name",
    "area",
    "bedrooms",
    "bathrooms",
    "sale_price",
    "rental_price",
    "available_from",
    "available_until",
    "furnished",
    "balconies",
    "balcony_direction",
    "notes",
    "last_updated",
    "color",
  ];
  await file.mv(
    path.join(__dirname, "../public/upload/") + "import_excel.xlsx"
  );
  var workbook = await XLSX.readFile(
    path.join(__dirname, "../public/upload/") + "import_excel.xlsx"
  );
  var sheet_name_list = workbook.SheetNames;
  var xlData = await XLSX.utils.sheet_to_json(
    workbook.Sheets[sheet_name_list[0]],
    { header: header }
  );
  var newData = xlData.slice(1);

  const arrResult = [];

  for (let i = 0; i < newData.length; i++) {
    var element = newData[i];
    var project = await Project.findOne({
      project_name: { $regex: element.project_name, $options: "i" },
    });
    var building = await Building.findOne({
      building_name: { $regex: element.building_name, $options: "i" },
    });
    var axis = await Axis.findOne({
      axis_name: { $regex: element.axis_name, $options: "i" },
    });
    var property = await Properties.findOne({
      property_name: { $regex: element.property_name, $options: "i" },
    });
    var balcony_direction = await BalconyDirection.findOne({
      balcony_direction_name: {
        $regex: element.balcony_direction,
        $options: "i",
      },
    });
    var furnished = await Furnished.findOne({
      furnished_name: { $regex: element.furnished, $options: "i" },
    });

    if (project == null) {
      return res.status(500).json({
        success: false,
        message: `Dự án không có trong dữ liệu dòng ${i + 2}`,
      });
    }
    if (building == null) {
      return res.status(500).json({
        success: false,
        message: `Toà không có trong dữ liệu dòng ${i + 2}`,
      });
    }
    if (axis == null) {
      return res.status(500).json({
        success: false,
        message: `Trục căn không có trong dữ liệu dòng ${i + 2}`,
      });
    }
    if (property == null) {
      return res.status(500).json({
        success: false,
        message: `Loại BDS không có trong dữ liệu dòng ${i + 2}`,
      });
    }
    if (balcony_direction == null) {
      return res.status(500).json({
        success: false,
        message: `Hướng ban công không có trong dữ liệu dòng ${i + 2}`,
      });
    }
    if (furnished == null) {
      return res.status(500).json({
        success: false,
        message: `Nội thất không có trong dữ liệu dòng ${i + 2}`,
      });
    }

    var apartment_name =
      element.building_name + element.floor + element.axis_name;

    const checkApartment = await Apartment.findOne({
      apartment_name: apartment_name,
    });

    var values = {
      apartment_name: apartment_name,
      building: building._id,
      phone_number: element.phone_number,
      project: project._id,
      axis: axis._id,
      owner: element.owner,
      properties: property._id,
      floor: element.floor,
      area: element.area,
      bedrooms: element.bedrooms,
      bathrooms: element.bathrooms,
      sale_price: element.sale_price,
      rental_price: element.rental_price,
      available_from: element.available_from,
      available_until: element.available_until,
      furnished: furnished._id,
      balconies: element.balconies,
      balcony_direction: balcony_direction._id,
      last_updated: element.last_updated,
      status: true,
      notes: element.notes,
      color: "#ffffff",
    };

    if (checkApartment) {
      await Apartment.findByIdAndUpdate(checkApartment._id, { values });
      values.building = element.building_name;
      values.project = element.project_name;
      values.axis = element.axis_name;
      values.properties = element.property_name;
      values.furnished = element.furnished_name;
      values.balcony_direction = element.balcony_direction_name;
      values.result = "Dữ liệu đã được sửa";
      arrResult.push(values);
    } else {
      const newApartment = new Apartment(values);
      await newApartment.save();
      values.building = element.building_name;
      values.project = element.project_name;
      values.axis = element.axis_name;
      values.properties = element.property_name;
      values.furnished = element.furnished_name;
      values.balcony_direction = element.balcony_direction_name;
      values.result = "Thành công";
      arrResult.push(values);
    }
  }
  res.json({ success: true, message: "Dữ liệu đã được nhập", arrResult });
};

const removeReqAppController = async (req, res) => {
  const { id } = req.body;
  const deleteStatus = await ApartmentUser.findByIdAndDelete(id);
  res.json({ success: true, message: "Căn hộ đã được xoá." });
};

const exportExcelApartmentController = async (req, res) => {
  const { data } = req.body;
  // const { data } = req.body;
  // var ws = XLSX.utils.json_to_sheet(data);
  // var wb = XLSX.utils.book_new();
  // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  // XLSX.writeFile(wb, "apartment.xlsx");
  // res.json({ success: true, message: "Đã xuất file excel" });
  try {
    const apartments = await Apartment.find({ _id: { $in: data } }).populate("project", 'project_name')
      .populate("building", 'building_name')
      .populate("properties", 'property_name')
      .populate("balcony_direction", "balcony_direction_name")
      .populate("furnished", 'furnished_name')
      .populate("axis", 'axis_name');
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(apartments),
      process.env.ACCESS_TOKEN_SECRET
    ).toString();
    res.json({ success: true, message: "Found apartments", apartment: encryptedData });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error finding apartments", error });
  }
}

module.exports = {
  getAllApartmentController,
  createApartmentController,
  deleteApartmentController,
  editApartmentController,
  detailApartmentController,
  uploadImageController,
  deleteImageController,
  searchApartmentController,
  getAllKhoBan,
  getAllKhoMua,
  getALlRequest,
  getALlApprove,
  requestData,
  approveData,
  getApartmentApproveForUser,
  changeStatusApartment,
  importExcelApartmentController,
  removeReqAppController,
  exportExcelApartmentController,
};
