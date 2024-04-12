// controllers/generalInfoController.js
const GeneralInfo = require("../models/GeneralInfo");
const axios = require("axios");

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

exports.getBackgroundImage = async (req, res) => {
  try {
    const generalInfo = await GeneralInfo.findOne();

    // Get the backgroundImage from the generalInfo
    const { backgroundImage } = generalInfo;

    if (!backgroundImage) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Fetch the image binary data from the backgroundImage
    const imageResponse = await axios.get(backgroundImage, { responseType: 'arraybuffer' });

    // Set the appropriate Content-Type header based on the image format
    const contentType = imageResponse.headers['content-type'];
    res.setHeader('Content-Type', contentType);

    // Return the binary image data as the response
    res.send(imageResponse.data);
  } catch (error) {
    console.error('Error fetching menu item image:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};