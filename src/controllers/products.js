const Products = require("../models/products");

const createProducts = async (req, res) => {
  try {
    const { productName, productCategories, productCompany } = req.body;

    if (!productName || !productCategories || !productCompany || !req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const newProduct = new Products({
      productName,
      productCategories,
      productCompany,
      productImage: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newProduct.save();

    return res
      .status(200)
      .json({ success: true, message: "Product added Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


const fetchProducts = async (req, res) => {
  try {
    const allProducts = await Products.find().sort({ createdAt: -1 });

    if (!allProducts || allProducts.length === 0) {
      return res.status(404).json({ success: false, message: "Products Not Found" });
    }

    return res.status(200).json({ success: true, allproducts: allProducts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


module.exports = { createProducts, fetchProducts };