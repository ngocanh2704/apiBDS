const Image = require("../models/Image");
const Project = require("../models/Project");
const Building = require("../models/Building");
const Apartment = require("../models/Apartment");
var path = require("path");
var mkdirp = require('mkdirp')

const getAllImageController = async (req, res) => {
  const allImage = await Image.find({ isDelete: false })
    .populate("project")
    .populate("building")
    .populate("apartment");
  const allProject = await Project.find({ isDelete: false });
  const allBuilding = await Building.find({ isDelete: true });
  const allApartment = await Apartment.find({ isDelete: false });

  const user =   req.session.user
  res.render("image", {
    data: allImage,
    dataProject: allProject,
    dataBuilding: allBuilding,
    dataApartment: allApartment,
    user: user
  });
};

const createImageController = async (req, res) => {
  const { project, building, apartment } = req.body;
  const newImage = new Image({
    project: project,
    building: building,
    apartment: apartment,
    image_link: [],
  });
  await newImage.save();
  const findImage = await Image.findOne({apartment: apartment});
  const findApartment = await Apartment.findOneAndUpdate({_id: apartment},{image: findImage._id})
  res.json({ success: true, message: "Hình ảnh đã được tạo." });
};

const deleteImageController = async (req, res) => {
  const { id } = req.body;
  const deleteImage = await Image.findByIdAndUpdate(id, { isDelete: true });
  res.json({ success: true, message: "Trục căn hộ đã được xoá." });
};

const editStatusController = async (req, res) => {
  const { id, status_name } = req.body;
  const statusName = await Status.findOne({ status_name: status_name });
  if (statusName) {
    return res.status(400).json({
      success: false,
      message: "Trục căn hộ đã tồn tại vui lòng tạo trục căn hộ khác.",
    });
  }

  const editStatus = await Status.findByIdAndUpdate(
    id,
    {
      status_name: status_name,
    },
    { new: true }
  );
  res.json({ success: true, message: "Trục căn hộ đã được sửa." });
};

const deleteImageIndexController = async (req, res) => {
  const { id, index } = req.body;
  const deleteImage = await Image.findById(id);
 deleteImage.image_link.splice(index, 1);
  const deleteImageIndex = await Image.findByIdAndUpdate(
    id,
    { image_link: deleteImage.image_link },
    { new: true }
  );
  res.json({ success: true, message: "Hình ảnh đã được xoá." }); 
};

const addImageIndexController = async (req,res) => {
  // console.log(req.files)
  const {id} = req.body
  const {image} = req.files
  const arrayImage = await Image.findById(id,{ isDelete: false })
  var Urls = arrayImage.image_link ? arrayImage.image_link : []
  if(Array.isArray(image)){
    for (var i = 0; i < image.length; i++) {
        image[i].mv(path.join(__dirname, "../public/upload/") + id +image[i].name);
        arrayImage.image_link.push("/upload/" +id+ image[i].name);
      }
  }else{
    image.mv(path.join(__dirname, "../public/upload/") + id +image.name);
    Urls.push("/upload/" +id+ image.name);
  }
  const updateImage = await Image.findByIdAndUpdate(id,{ image_link: Urls })
  // if (req.files) {
  //   const { image } = req.files;
  //   if(Array.isArray(image)){
  //     for (var i = 0; i < image.length; i++) {
      //  image[i].mv(path.join(__dirname, "../public/upload/") + image[i].name);
  //       Urls.push("/upload/" + image[i].name);
  //     }
  //   }else {
  //     Urls.push("/upload/" + image.name);
  //   }
  // } else {
  //   Urls.push("/upload/noimage.jpg");
  // }
  res.json({ success: true, message: "Hình ảnh đã được thêm." });
}

module.exports = {
  getAllImageController,
  createImageController,
  deleteImageController,
  editStatusController,
  deleteImageIndexController,
  addImageIndexController
};
