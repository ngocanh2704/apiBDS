const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phone_number: {
      type: String,
      require: true,
    },
    apartment_name: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      require: true,
    },
    day_sign: {
      type: Date,
      default: Date.now,
    },
    bod: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", CustomerSchema);
