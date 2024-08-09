const Apartment = require("../models/Apartment");
const BalconyDirection = require("../models/BalconyDirection");
const Owner = require("../models/Owner");
const Property = require("../models/Property");
const Status = require("../models/Status");
const Project = require("../models/Project");
const Axis = require("../models/Axis");
const User = require("../models/Users");
const Building = require("../models/Building");
const Users = require("../models/Users");

const getAll = async (req, res) => {
  const allApartment = await Apartment.find({ isDelete: false })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  const allOwner = await Owner.find({ isDelete: true });
  const allProperty = await Property.find({ isDelete: true });
  const allStatus = await Status.find({ isDelete: true });
  const allBalconyDirection = await BalconyDirection.find({ isDelete: true });
  const allProject = await Project.find({ isDelete: false });
  const allAxis = await Axis.find({ isDelete: false });
  const allBuilding = await Building.find({ isDelete: false });
  const user = req.session.user;

  const allApartmentSalePrice = await Apartment.find({
    isDelete: false,
    rental_price: 0,
  })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  const allApartmentRentalPrice = await Apartment.find({
    isDelete: false,
    sale_price: 0,
  })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  const allApartmentRequest = await Apartment.find({
    isDelete: false,
    isRequest: true,
  })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  const allApartmentApprove = await Apartment.find({
    isDelete: false,
    isApprove: true,
  })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  res.render("index", {
    data: allApartment,
    dataOwner: allOwner,
    dataProperty: allProperty,
    dataStatus: allStatus,
    dataBalconyDirection: allBalconyDirection,
    dataProject: allProject,
    dataAxis: allAxis,
    dataSale: allApartmentSalePrice,
    dataRental: allApartmentRentalPrice,
    dataRequest: allApartmentRequest,
    dataApprove: allApartmentApprove,
    dataBuilding: allBuilding,
  });
};

const getAllKhoSale = async (req, res) => {
  const allApartment = await Apartment.find({ isDelete: false })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  const allOwner = await Owner.find({ isDelete: true });
  const allProperty = await Property.find({ isDelete: true });
  const allStatus = await Status.find({ isDelete: true });
  const allBalconyDirection = await BalconyDirection.find({ isDelete: true });
  const allProject = await Project.find({ isDelete: false });
  const allAxis = await Axis.find({ isDelete: false });
  const user = req.session.user;

  const allApartmentSalePrice = await Apartment.find({
    isDelete: false,
    rental_price: 0,
  })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  const allApartmentRentalPrice = await Apartment.find({
    isDelete: false,
    sale_price: 0,
  })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  const allApartmentRequest = await Apartment.find({
    isDelete: false,
    isRequest: true,
  })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  const allApartmentApprove = await Apartment.find({
    isDelete: false,
    isApprove: true,
  })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  // res.render("khosale", {
  //   data: allApartment,
  //   dataOwner: allOwner,
  //   dataProperty: allProperty,
  //   dataStatus: allStatus,
  //   dataBalconyDirection: allBalconyDirection,
  //   dataProject: allProject,
  //   dataAxis: allAxis,
  //   dataSale: allApartmentSalePrice,
  //   dataRental: allApartmentRentalPrice,
  //   dataRequest : allApartmentRequest,
  //   dataApprove: allApartmentApprove,
  //   user: user
  // });
  res.json({ success: true, data: allApartmentSalePrice });
};
const getALlKhoBan = async (req, res) => {
  const allOwner = await Owner.find({ isDelete: true });
  const allProperty = await Property.find({ isDelete: true });
  const allStatus = await Status.find({ isDelete: true });
  const allBalconyDirection = await BalconyDirection.find({ isDelete: true });
  const allProject = await Project.find({ isDelete: false });
  const allAxis = await Axis.find({ isDelete: false });
  const user = req.session.user;

  const allApartmentRentalPrice = await Apartment.find({
    isDelete: false,
    sale_price: 0,
  })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
  // res.render("khoretal", {
  //   dataOwner: allOwner,
  //   dataProperty: allProperty,
  //   dataStatus: allStatus,
  //   dataBalconyDirection: allBalconyDirection,
  //   dataProject: allProject,
  //   dataAxis: allAxis,
  //   dataRental: allApartmentRentalPrice,
  //   user: user
  // });
  res.json({ success: true, data: allApartmentRentalPrice });
};

const getALlRequest = async (req, res) => {
  const allApartmentRequest = await Apartment.find({
    isDelete: false,
    isRequest: true,
    isApprove: false,
  })
    .populate("owner")
    .populate("property")
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
  const { user } = req.body;
  const allApartmentApprove = await Apartment.find({
    isDelete: false,
    isRequest: true,
    isApprove: true,
  })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project")
    .populate("axis");
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
  getAll,
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
