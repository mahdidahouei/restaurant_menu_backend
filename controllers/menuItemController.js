const MenuItem = require("../models/MenuItem");
const Category = require("../models/Category");
const { validateMenuItem } = require("../utils/validation");
const axios = require("axios");

exports.createMenuItem = async (req, res) => {
  try {
    const { title, imageUrl, ingredients, price, category } = req.body;

    // Validate input data
    const { error } = validateMenuItem(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Find the category by name to get its ObjectId
    const categoryObject = await Category.findOne({ name: category });
    if (!categoryObject) {
      throw new Error(`Category "${category}" not found`);
    }

    // Create a new MenuItem document
    const menuItem = new MenuItem({
      title,
      imageUrl,
      ingredients,
      price,
      category: categoryObject._id, // Assign the ObjectId of the category
    });

    // Save the new menu item to the database
    await menuItem.save();
    res
      .status(201)
      .json({ message: "Menu item created successfully", menuItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl, ingredients, price, category } = req.body;

    // Validate input data
    const { error } = validateMenuItem(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const menuItem = await MenuItem.findById(id);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    const menuItemCategory = Category.findOne({ name: category });

    menuItem.title = title;
    menuItem.imageUrl = imageUrl;
    menuItem.ingredients = ingredients;
    menuItem.price = price;
    menuItem.category = menuItemCategory;

    await menuItem.save();
    res.json({ message: "Menu item updated successfully", menuItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findById(id);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    await MenuItem.findByIdAndDelete(id);
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMenuItems = async (req, res) => {
  try {
    
    // Fetch all categories from the database
    const categories = await Category.find({}, 'name').sort('priority');

    // Fetch all menu items from the database
    const menuItems = await MenuItem.find().populate('category');

    // Group menu items by category
    const menuItemsByCategory = categories.map(category => {
      const categoryMenuItems = menuItems.filter(item => String(item.category.name) === String(category.name));
      return {
        title: category.name,
        menuItems: categoryMenuItems.map(item => ({
          _id: item._id,
          title: item.title,
          imageUrl: item.imageUrl,
          ingredients: item.ingredients,
          price: item.price
        }))
      };
    });

    // Return the response with categories and menu items
    res.json({ categories: menuItemsByCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    // Extract the binary image file from the request body
    const imageFile = req.file;

    // Check if image file exists
    if (!imageFile) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Send the image file to the ImgBB API for upload
    const formData = new FormData();
    formData.append("image", imageFile.buffer.toString("base64"));

    const imgbbResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Extract the uploaded image URL from the ImgBB API response
    const imageUrl = imgbbResponse.data.data.url;

    // Return the uploaded image URL in the response
    return res
      .status(200)
      .json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
