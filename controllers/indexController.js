const Apartment = require("../models/Apartment");
const BalconyDirection = require("../models/BalconyDirection");
const Owner = require("../models/Owner");
const Properties = require("../models/Properties");
const Status = require("../models/Status");
const Project = require("../models/Project");
const Axis = require("../models/Axis");
const User = require("../models/Users");
const Building = require("../models/Building");
const Users = require("../models/Users");

const getAllKhoSale = async (req, res) => {
  const allApartmentSalePrice = await Apartment.find({
    isDelete: false,
    rental_price: 0,
  })
    .populate("owner")
    .populate("properties")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");

  res.json({ success: true, data: allApartmentSalePrice });
};
const getALlKhoBan = async (req, res) => {
  const allApartmentRentalPrice = await Apartment.find({
    isDelete: false,
    sale_price: 0,
  })
    .populate("owner")
    .populate("properties")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
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
    .populate("axis");

  res.json({ success: true, data: allApartmentRequest });
};

const createData = async (req, res) => {
  const {
    project_id,
    apartment_name,
    axis,
    owner_name,
    phone_number,
    property_id,
    floor,
    area,
    bedrooms,
    bathrooms,
    sale_price,
    rental_price,
    available_from,
    available_until,
    furnished,
    balconies,
    balcony_direction,
    last_update,
    status_id,
    notes,
  } = req.body;
  const apartmentName = await Apartment.findOne({
    apartment_name: apartment_name,
  });
  if (apartmentName)
    return res
      .status(400)
      .json({ success: false, message: "Tên căn hộ đã tồn tại." });
  const newApartment = new Apartment({
    apartment_name: apartment_name,
    project: project_id,
    owner: owner_name,
    axis: axis,
    property: property_id,
    floor: floor,
    area: area,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    sale_price: sale_price ? sale_price : "0",
    rental_price: rental_price ? rental_price : "0",
    available_from: available_from,
    available_until: available_until,
    furnished: furnished,
    balconies: balconies,
    balcony_direction: balcony_direction,
    last_updated: last_update,
    status: status_id,
    notes: notes,
    phone_number: phone_number,
    user_id: req.session.user._id,
  });
  await newApartment.save();
  res.json({ success: true, message: "Căn hộ đã được tạo." });
};

const deleteData = async (req, res) => {
  const { id } = req.body;
  const deleteInvestor = await Apartment.findByIdAndUpdate(id, {
    isDelete: true,
  });
  res.json({ success: true, message: "Căn hộ đã dudowjc xoá" });
};

const editData = async (req, res) => {
  const {
    id,
    project_id,
    apartment_name,
    axis,
    owner_name,
    phone_number,
    property_id,
    floor,
    area,
    bedrooms,
    bathrooms,
    sale_price,
    rental_price,
    available_from,
    available_until,
    furnished,
    balconies,
    balcony_direction,
    last_update,
    status_id,
    notes,
  } = req.body;
  const editApartment = await Apartment.findByIdAndUpdate(
    id,
    {
      apartment_name: apartment_name,
      project: project_id,
      owner: owner_name,
      axis: axis,
      property: property_id,
      floor: floor,
      area: area,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      sale_price: sale_price ? sale_price : "0",
      rental_price: rental_price ? rental_price : "0",
      available_from: available_from,
      available_until: available_until,
      furnished: furnished,
      balconies: balconies,
      balcony_direction: balcony_direction,
      last_updated: last_update,
      status: status_id,
      notes: notes,
      phone_number: phone_number,
    },
    { new: true }
  );
  res.json({ success: true, message: "Tên chủ đầu tư đã được sửa." });
};

const requestData = async (req, res) => {
  const { id } = req.body;
  const deleteInvestor = await Apartment.findByIdAndUpdate(
    id,
    { isRequest: true },
    { new: true }
  );
  res.json({ success: true, message: "Căn hộ đã đã được yêu cầu " });
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
  .sort({ status: 1, color: -1 });
  res.json({ success: true, data: allApartmentApprove });
};

const approveData = async (req, res) => {
  const { id, user } = req.body;
  const apartmentFind = await Apartment.findById(id);
  const userFind = await Users.findById(user);
  var arr = apartmentFind.user_approve;
  arr.push({ name: userFind.username, id: user });
  const approveData = await Apartment.findByIdAndUpdate(
    id,
    { isApprove: true, user_approve: arr },
    { new: true }
  );
  res.json({ success: true, message: "Căn hộ đã đã được yêu cầu " });
};

module.exports = {
  createData,
  deleteData,
  editData,
  requestData,
  getAllKhoSale,
  getALlKhoBan,
  getALlRequest,
  getALlApprove,
  approveData,
};
