// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  priority: {
    type: Number,
    required: true,
    default: 0, // Default priority value
  },
}, { collection: 'categories' }); // Specify collection name 'categories'

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
