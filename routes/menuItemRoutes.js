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
 * /api/menu-items:
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
 * /api/menu-items:
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
 * /api/menu-items/{id}:
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
 *   /api/menu-items:
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

router.post('/', authMiddleware, menuItemController.createMenuItem);
router.put('/', authMiddleware, menuItemController.updateMultipleMenuItems);
router.put('/:id', authMiddleware, menuItemController.updateMenuItem);
router.delete('/:id', authMiddleware, menuItemController.deleteMenuItem);
router.get('/', menuItemController.getMenuItems);
router.get('/:id/image', menuItemController.getMenuItemImage);

module.exports = router;