const Categories = require("../models/categories");
const cloudinary = require("../config/cloudinary");

const createCategories = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existing = await Categories.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }

    const newCategory = new Categories({
      name,
      slug,
      categoryImage: {
        url: req.file.path,
        publicId: req.file.filename,
      },
    });

    await newCategory.save();

    return res.status(200).json({ success: true, message: "Category added Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const fetchCategories = async (req, res) => {
  try {
    const allCategories = await Categories.find().sort({ createdAt: -1 });

    if (!allCategories || allCategories.length === 0) {
      return res.status(404).json({ success: false, message: "Categories Not Found" });
    }

    return res.status(200).json({ success: true, categories: allCategories });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Category id is required" });
    }

    const category = await Categories.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    if (category.categoryImage?.publicId) {
      await cloudinary.uploader.destroy(category.categoryImage.publicId);
    }

    await Categories.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createCategories, fetchCategories, deleteCategories };