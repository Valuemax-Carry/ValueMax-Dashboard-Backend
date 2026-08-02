const Products = require("../models/products");
const cloudinary = require("../config/cloudinary");

const createProducts = async (req, res) => {
  try {
    const { productName, productCategories, productCompany } = req.body;

    if (!productName || !productCategories || !productCompany || !req.file) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const newProduct = new Products({
      productName,
      productCategories,
      productCompany,
      productImage: {
        url: req.file.path,        
        publicId: req.file.filename, 
      },
    });

    await newProduct.save();

    return res.status(200).json({ success: true, message: "Product added Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
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
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Product id is required" });
    }

    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.productImage?.publicId) {
      await cloudinary.uploader.destroy(product.productImage.publicId);
    }

    await Products.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const fetchProductsByCategory = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({ success: false, message: "Category slug is required" });
    }

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const products = await Products.find({
      productCategories: { $regex: new RegExp(`^${escapeRegex(slug)}$`, "i") },
    }).sort({ createdAt: -1 });

    const formatted = products.map((p) => ({
      id: p._id,
      name: p.productName,
      company: p.productCompany,
      img: p.productImage?.url || null, 
    }));

    return res.status(200).json({ success: true, products: formatted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createProducts, fetchProducts, fetchProductsByCategory, deleteProducts };