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

    // Find the category by name to get its ObjectId
    const categoryObject = await Category.findOne({ name: category });
    if (!categoryObject) {
      throw new Error(`Category "${category}" not found`);
    }

    menuItem.title = title;
    menuItem.imageUrl = imageUrl;
    menuItem.ingredients = ingredients;
    menuItem.price = price;
    menuItem.category = categoryObject._id;

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
          imageUrl: (item.imageUrl && item.imageUrl != "") ? `https://${req.get('host')}/api/menuItems/${item._id}/image` : null,
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


exports.getMenuItemImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the menuItem by ID
    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Get the imageUrl from the menuItem
    const { imageUrl } = menuItem;

    if (!imageUrl) {
      return res.status(404).json({ message: 'Image not found for this menu item' });
    }

    // Fetch the image binary data from the imageUrl
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

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

exports.updateMultipleMenuItems = async (req, res) => {
  try {
    const { menuItems } = req.body;

    // Update each menu item
    const promises = menuItems.map(async (item) => {
      const { _id, ...updateData } = item;
      await MenuItem.findByIdAndUpdate(_id, updateData);
    });

    // Wait for all updates to complete
    await Promise.all(promises);

    res.status(200).json({ message: 'Menu items updated successfully' });
  } catch (error) {
    console.error('Error updating menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};