// MenuItem.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: String,
  ingredients: [String],
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true,
  },
  priority: {
    type: Number,
    default: 0, // Default priority value
  },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);