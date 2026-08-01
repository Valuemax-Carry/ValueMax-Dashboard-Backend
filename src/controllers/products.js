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

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product id is required" });
    }

    const deleted = await Products.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const fetchProductsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res
        .status(400)
        .json({ success: false, message: "Category slug is required" });
    }

    const products = await Products.find({
      productCategories: { $regex: new RegExp(`^${slug}$`, "i") },
    }).sort({ createdAt: -1 });

    const formatted = products.map((p) => ({
      id: p._id,
      name: p.productName,
      company: p.productCompany,
      img: p.productImage?.data
        ? `data:${p.productImage.contentType};base64,${p.productImage.data.toString("base64")}`
        : null,
    }));

    return res.status(200).json({ success: true, products: formatted });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createProducts, fetchProducts, fetchProductsByCategory, deleteProducts };