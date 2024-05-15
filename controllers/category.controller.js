const Category = require('../models/category.model');

const createCategory = async (req, res, next) => {
  const { name, description, userId, budget } = req.body.category;

  if (!name || !userId)
    return res.status(400).json({ message: 'Content cannot be empty' });

  const newCategory = new Category({
    name,
    description,
    userId,
    budget,
  });

  try {
    const cat = await newCategory.save();
    res.status(201).json(cat);
  } catch (e) {
    res.status(400).json({ message: 'Category not created: ' + e.message });
  }
};

const getAllUserCategories = async (req, res, next) => {
  try {
    const userCategories = await Category.find({ userId: req.params.userId });
    res.status(200).json(userCategories);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body.category,
    );
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteAllCategories = async (req, res) => {
  try {
    await Category.deleteMany();
    res.status(200).json({ message: 'All categories deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createCategory,
  getAllUserCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
};
