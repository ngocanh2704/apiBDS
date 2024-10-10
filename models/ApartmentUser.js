const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApartmentUserSchema = new Schema(
  {
    apartment: {
      type: Schema.Types.ObjectId,
      ref: "apartment",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    isRequest: {
      type: Boolean,
      default: false,
    },
    // expireAt: { type: Date, default: Date.now, index: { expires: "2m" } },
  },
  { timestamps: true }
);
ApartmentUserSchema.index(
  { updatedAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 }
);
module.exports = mongoose.model("apartmentuser", ApartmentUserSchema);
