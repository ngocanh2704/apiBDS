const Apartment = require("../models/Apartment");
const BalconyDirection = require("../models/BalconyDirection");
const Owner = require("../models/Owner");
const Property = require("../models/Property");
const Status = require("../models/Status");
var path = require("path");
const fs = require("fs");

const getAllApartmentController = async (req, res) => {
  const allApartment = await Apartment.find({ isDelete: false })
    .populate("owner")
    .populate("property")
    .populate("status")
    .populate("balcony_direction")
    .populate("project");
  const allOwner = await Owner.find({ isDelete: true });
  const allProperty = await Property.find({ isDelete: true });
  const allStatus = await Status.find({ isDelete: true });
  const allBalconyDirection = await BalconyDirection.find({ isDelete: true });
  res.json({ success: true, data: allApartment });
};

const createApartmentController = async (req, res) => {
  const {
    apartment_name,
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
    phone_number: phone_number,
    project: project,
    axis: axis,
    owner: owner,
    property: property,
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
  });

  await newApartment.save();
  res.json({ success: true, message: "Căn hộ đã được tạo." });
};

const deleteApartmentController = async (req, res) => {
  const { id } = req.body;
  const deleteStatus = await Apartment.findByIdAndUpdate(id, {
    isDelete: false,
  });
  res.json({ success: true, message: "Căn hộ đã được xoá." });
};

const editApartmentController = async (req, res) => {
  const {
    id,
    apartment_name,
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
  } = req.body;

  const editApartment = await Apartment.findByIdAndUpdate(
    id,
    {
      apartment_name: apartment_name,
      phone_number: phone_number,
      project: project,
      axis: axis,
      owner: owner,
      property: property,
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
    .populate("status");
  res.json({ success: true, detail });
};

const uploadImageController = async (req, res) => {
  const { file } = req.files;
  const { id } = req.body;
  const image = await Apartment.findById(id, { isDelete: false });
  var arr = image.image;
  if (image.image.length >= 0) {
    var stt = image.image.length + 1;
    file.mv(path.join(__dirname, "../public/upload/") + id + stt + ".png");
    arr.push("/upload/" + id + stt + ".png");
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
  res.json({success: true, message: 'Đã xoá thành công'})
};

module.exports = {
  getAllApartmentController,
  createApartmentController,
  deleteApartmentController,
  editApartmentController,
  detailApartmentController,
  uploadImageController,
  deleteImageController,
};
