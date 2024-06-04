/**
 * @swagger
 * /api/upload-image:
 *   post:
 *     summary: Upload an image for a menu item
 *     tags: [Image]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload. File size must not exceed 5MB.
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the image upload.
 *                 imageUrl:
 *                   type: string
 *                   description: The URL of the uploaded image.
 *       400:
 *         description: Bad request. Image file is required.
 *       500:
 *         description: Internal server error
 */
const express = require("express");
const router = express.Router();
const uploadImageController = require("../controllers/uploadImageController");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/",
  authMiddleware,
  uploadImageController.uploadImage
);

module.exports = router;