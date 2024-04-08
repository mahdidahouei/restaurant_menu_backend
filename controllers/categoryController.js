// controllers/categoryController.js
const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const { name, priority } = req.body;

    const category = new Category({ name, priority });
    await category.save();

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort('priority');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateMultipleCategories = async (req, res) => {
    try {
      const categories = req.body;
  
      // Update categories in the database
      const promises = categories.map(async category => {
        await Category.findByIdAndUpdate(category._id, category);
      });
      await Promise.all(promises);
  
      res.status(200).json({ message: 'Categories updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, priority } = req.body;

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name;
    category.priority = priority;
    await category.save();

    res.json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
