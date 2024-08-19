var Project = require("../models/Project");
var Investors = require("../models/Investors");
var Status = require("../models/Status");
var Property = require("../models/Properties");

const getAllProjectController = async (req, res) => {
  const allProject = await Project.find({ isDelete: false })
    .populate("investor")
    .populate("status")
    .populate("property");
  const allInvestor = await Investors.find({ isDelete: false });
  const allStatus = await Status.find({ isDelete: false });
  const allProperty = await Property.find({ isDelete: false });
  res.json({ success: true, data: allProject });
};
const createProjectController = async (req, res) => {
  console.log(req.body);
  const {
    project_name,
    investor,
    location,
    description,
    status,
    start_date,
    completion_date,
    total_units,
    property,
  } = req.body;

  const projectName = await Project.findOne({ project_name: project_name });
  console.log(projectName);
  if (projectName) {
    return res
      .status(400)
      .json({ success: false, message: "Tên dự án đã tồn tại." });
  }

  const newProject = new Project({
    project_name: project_name,
    investor: investor,
    location: location,
    description: description,
    status: status,
    start_date: start_date,
    completion_date: completion_date,
    total_units: total_units,
    property: property,
  });

  await newProject.save();

  res.json({ success: true, message: "Dự án đã được tạo thành công." });
};

const deleteProjectController = async (req, res) => {
  const { id } = req.body;
  const deleteProject = await Project.findByIdAndDelete(id);
  res.json({ success: true, message: "Dự án được xoá thành công." });
};

const editProjectController = async (req, res) => {
  const {
    id,
    project_name,
    investor,
    location,
    description,
    status,
    start_date,
    completion_date,
    total_units,
    property,
  } = req.body;

  console.log(
    id,
    project_name,
    investor,
    location,
    description,
    status,
    start_date,
    completion_date,
    total_units,
    property
  );

  const editProject = await Project.findByIdAndUpdate(
    id,
    {
      project_name: project_name,
      investor: investor,
      location: location,
      description: description,
      status: status,
      start_date: start_date,
      completion_date: completion_date,
      total_units: total_units,
      property: property,
    },
    { new: true }
  );

  res.json({ success: true, message: "Dự án đã được sửa." });
};

const detailProjectController = async (req, res) => {
    const {id} = req.body
  const data = await Project.findById(id, { isDelete: false });
  res.json({ success: true, data });
};

module.exports = {
  getAllProjectController,
  createProjectController,
  deleteProjectController,
  editProjectController,
  detailProjectController,
};
