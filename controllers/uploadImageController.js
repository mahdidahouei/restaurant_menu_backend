// controllers/uploadImageController.js
const axios = require("axios");

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