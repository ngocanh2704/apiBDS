const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApartmentSchema = new Schema({
  apartment_name: {
    type: String,
    require: true,
  },
  building: {
    type: Schema.Types.ObjectId,
    ref: "building",
  },
  properties: {
    type: Schema.Types.ObjectId,
    ref: "properties",
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "project",
  },
  axis: {
    type: Schema.Types.ObjectId,
    ref: "axis",
  },
  owner: {
    type: String,
    require: true,
  },
  floor: {
    type: String,
    require: true,
  },
  area: {
    type: String,
    require: true,
  },
  phone_number: {
    type: String,
    require: true,
  },
  bedrooms: {
    type: String,
    require: true,
  },
  bathrooms: {
    type: String,
    require: true,
  },
  sale_price: {
    type: String,
    require: true,
  },
  rental_price: {
    type: String,
    require: true,
  },
  available_from: {
    type: String,
    require: true,
  },
  available_until: {
    type: String,
    require: true,
  },
  furnished: {
    type: Schema.Types.ObjectId,
    ref: "furnished",
  },
  balconies: {
    type: String,
    require: true,
  },
  balcony_direction: {
    type: Schema.Types.ObjectId,
    ref: "balconydirection",
  },
  last_updated: {
    type: String,
    require: true,
  },
  image_link: {
    type: String,
    require: true,
  },
  status: {
    type: Schema.Types.ObjectId,
    ref: "status",
  },
  notes: {
    type: String,
    require: true,
  },
  createAt: {
    type: String,
    require: true,
  },
  UpdateAt: {
    type: String,
    require: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  isRequest: {
    type: Boolean,
    default: false,
  },
  isApprove: {
    type: Boolean,
    default: false,
  },
  image: {
    type: Array,
    require: true,
  },
  user_approve: {
    type: Array,
    reuquire: true,
  },
  color: {
    type: String,
    require: "#ffffff",
  },
});

module.exports = mongoose.model("apartment", ApartmentSchema);
