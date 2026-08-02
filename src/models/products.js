const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productCategories: {
      type: String,
      required: true,
      trim: true,
    },
    productCompany: {
      type: String,
      required: true,
      trim: true,
    },
    productImage: {
      url: { type: String, required: true },
      publicId: { type: String, required: true }, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);