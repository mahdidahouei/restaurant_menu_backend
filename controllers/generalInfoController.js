// controllers/generalInfoController.js
const GeneralInfo = require("../models/GeneralInfo");

exports.getGeneralInfo = async (req, res) => {
  try {
    const generalInfo = await GeneralInfo.findOne();
    res.json(generalInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createGeneralInfo = async (req, res) => {
  try {
    // Check if a general info object already exists
    const existingGeneralInfo = await GeneralInfo.findOne();
    if (existingGeneralInfo) {
      return res.status(400).json({ error: "General info already exists" });
    }

    // If not, create the new general info object
    const {
      name,
      appBarType,
      backgroundImage,
      backgroundColor,
      cardColor,
      imagePlaceHolderColor,
      menuType,
      textColor,
    } = req.body;

    const generalInfo = new GeneralInfo({
      name,
      appBarType,
      backgroundImage,
      backgroundColor,
      cardColor,
      imagePlaceHolderColor,
      menuType,
      textColor,
    });
    await generalInfo.save();

    res
      .status(201)
      .json({ message: "General info created successfully", generalInfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateGeneralInfo = async (req, res) => {
  try {
    const {
      name,
      appBarType,
      backgroundImage,
      backgroundColor,
      cardColor,
      imagePlaceHolderColor,
      menuType,
      textColor,
    } = req.body;

    const updatedGeneralInfo = await GeneralInfo.findOneAndUpdate(
      {},
      {
        name,
        appBarType,
        backgroundImage,
        backgroundColor,
        cardColor,
        imagePlaceHolderColor,
        menuType,
        textColor,
      },
      { new: true }
    );

    res.json({
      message: "General info updated successfully",
      generalInfo: updatedGeneralInfo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
