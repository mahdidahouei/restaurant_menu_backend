// models/GeneralInfo.js
const mongoose = require('mongoose');

const generalInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  appBarType: {
    type: String,
    enum: ['simple', 'sliver'],
    required: true,
  },
  backgroundImage: {
    type: String,
  },
  backgroundColor: {
    type: String,
    required: true,
  },
  cardColor: {
    type: String,
    required: true,
  },
  imagePlaceHolderColor: {
    type: String,
    required: true,
  },
  menuType: {
    type: String,
    enum: ['simple', 'expandable'],
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
});

const GeneralInfo = mongoose.model('GeneralInfo', generalInfoSchema);

module.exports = GeneralInfo;