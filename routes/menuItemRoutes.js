/**
 * @swagger
 * tags:
 *   name: Menu Items
 *   description: APIs for managing menu items
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       required:
 *         - title
 *         - price
 *       properties:
 *         title:
 *           type: string
 *         imageUrl:
 *           type: string
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 */


/**
 * @swagger
 * /api/menuItems:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu Items]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItem'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/menuItems:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu Items]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/menuItems/upload-image:
 *   post:
 *     summary: Upload an image for a menu item
 *     tags: [Menu Items]
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

/**
 * @swagger
 * /api/menuItems/{id}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Menu Items]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MenuItem'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MenuItem'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu Items]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Menu item ID
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * paths:
 *   /api/menuItems:
 *     put:
 *       summary: Update multiple menu items
 *       description: Update multiple menu items in the database.
 *       tags:
 *         - Menu Items
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MenuItemUpdate'
 *       responses:
 *         '200':
 *           description: Menu items updated successfully
 *         '400':
 *           description: Bad request
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal server error
 *
 * components:
 *   schemas:
 *     MenuItemUpdate:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the menu item to update
 *         title:
 *           type: string
 *           description: The updated title of the menu item
 *         imageUrl:
 *           type: string
 *           description: The updated image URL of the menu item
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           description: The updated list of ingredients of the menu item
 *         price:
 *           type: number
 *           description: The updated price of the menu item
 *         category:
 *           type: string
 *           description: The updated category of the menu item
 */

const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multerMiddleware');

router.post('/', authMiddleware, menuItemController.createMenuItem);
router.put('/', authMiddleware, menuItemController.updateMultipleMenuItems);
router.put('/:id', authMiddleware, menuItemController.updateMenuItem);
router.delete('/:id', authMiddleware, menuItemController.deleteMenuItem);
router.post('/upload-image', authMiddleware, upload.single('image'), menuItemController.uploadImage);
router.get('/', menuItemController.getMenuItems);
router.get('/:id/image', menuItemController.getMenuItemImage);

module.exports = router;