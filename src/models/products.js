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
      data: {
        type: Buffer,
        required: true,
      },
      contentType: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);