const Apartment = require("../models/Apartment");
var path = require("path");
const fs = require("fs");
const Users = require("../models/Users");
const ApartmentUser = require("../models/ApartmentUser");

const getAllApartmentController = async (req, res) => {
  const allApartment = await Apartment.find({ isDelete: false })
    .populate("owner")
    .populate("properties")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("furnished")
    .populate("axis")
    .populate("building")
    .sort({ status: -1 });
  res.json({ success: true, data: allApartment });
};

const getAllKhoBan = async (req, res) => {
  const allApartmentSalePrice = await Apartment.find({
    isDelete: false,
    sale_price: { $gt: 0 },
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
  res.json({ success: true, data: allApartmentSalePrice });
};

const createApartmentController = async (req, res) => {
  const {
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

  const checkApartment = await Apartment.find({
    project: project,
    floor: floor,
    axis: axis,
  });
  console.log(checkApartment);
  if (checkApartment) {
    res.status().json({ success: false, message: "Căn hộ đã tồn tại" });
  }

  const newApartment = new Apartment({
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

  await newApartment.save();
  res.json({ success: true, message: "Căn hộ đã được tạo." });
};

const deleteApartmentController = async (req, res) => {
  const { id } = req.body;
  const deleteStatus = await Apartment.findByIdAndDelete(id);
  res.json({ success: true, message: "Căn hộ đã được xoá." });
};

const editApartmentController = async (req, res) => {
  const {
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
  } = req.body;

  const editApartment = await Apartment.findByIdAndUpdate(
    id,
    {
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
    },
    { new: true }
  );
  res.json({ success: true, message: "Căn hộ đã được sửa." });
};

const detailApartmentController = async (req, res) => {
  const { id } = req.body;
  console.log(id);
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
  const {
    project_id,
    building_id,
    furnished,
    property_id,
    balconyDirection_id,
    bedrooms,
    axis_id,
  } = req.body;
  const projection = {
    project: project_id,
    building: building_id,
    furnished: furnished,
    properties: property_id,
    balcony_direction: balconyDirection_id,
    bedrooms: bedrooms,
    axis: axis_id,
  };
  const conditions = Object.keys(projection).reduce((result, key) => {
    if (projection[key]) {
      result[key] = projection[key];
    }
    return result;
  }, {});
  const findApartment = await Apartment.find(conditions) .populate("owner")
  .populate("properties")
  .populate("status")
  .populate("balcony_direction")
  .populate("project")
  .populate("furnished")
  .populate("axis")
  .populate("building")
  .sort({ status: -1 });

  console.log(findApartment)
  res.json({ success: true, data: findApartment });
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
  const allApartmentRequest = await Apartment.find({
    isDelete: false,
    isRequest: true,
    isApprove: false,
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
  res.json({ success: true, data: allApartmentRequest });
};

const getALlApprove = async (req, res) => {
  const allApartmentApprove = await Apartment.find({
    isDelete: false,
    isRequest: true,
    isApprove: true,
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
  res.json({ success: true, data: allApartmentApprove });
};
const requestData = async (req, res) => {
  const { id, user } = req.body;
  var checkRequest = await ApartmentUser.find({ apartment: id, user: user });
  if (checkRequest.length != 0) {
    return res.json({ success: false, message: "Căn hộ yêu cầu đã tồn tại." });
  }
  const newApartment = new ApartmentUser({
    apartment: id,
    user: user,
  });

  await newApartment.save();

  const requestApartment = await Apartment.findByIdAndUpdate(
    id,
    { isRequest: true, isApprove: false },
    { new: true }
  );

  res.json({ success: true, message: "Căn hộ đã đã được yêu cầu " });
};

const approveData = async (req, res) => {
  const { id } = req.body;
  const approveData = await Apartment.findByIdAndUpdate(
    id,
    { isApprove: true },
    { new: true }
  );
  res.json({ success: true, message: "Căn hộ đã đã được duyệt" });
};

const getApartmentApproveForUser = async (req, res) => {
  const { user, role } = req.body;
  var get = "";
  if (role == "staff") {
    get = await ApartmentUser.find({ user: user }).populate({
      path: "apartment",
      options: { sort: { status: 1 } },
      populate: [{ path: "project" }, { path: "axis" }, { path: "building" }],
    });
  } else {
    get = await ApartmentUser.find().populate({
      path: "apartment",
      options: { sort: { status: 1 } },
      populate: [{ path: "project" }, { path: "axis" }, { path: "building" }],
    });
  }
  var arr = [];
  get.forEach((element) => {
    if (
      (element.apartment.isRequest == true) &
      (element.apartment.isApprove == true)
    ) {
      arr.push(element.apartment);
    }
  });
  res.json({ success: true, data: arr });
};
const changeStatusApartment = async (req, res) => {
  const { id, status } = req.body;
  if (status == true) {
    const findStatus = await Apartment.findByIdAndUpdate(
      id,
      { status: status, color: "#ffffff" },
      { new: true }
    );
  } else {
    const findStatus = await Apartment.findByIdAndUpdate(
      id,
      { status: status, color: "#bfbfbf" },
      { new: true }
    );
  }

  res.json({ success: true, message: "Đã thay đổi trạng thái!" });
};

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
};
