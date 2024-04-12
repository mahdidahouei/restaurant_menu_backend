// generalInfoRoutes.js

const express = require("express");
const router = express.Router();
const {
  createGeneralInfo,
  getGeneralInfo,
  updateGeneralInfo,
} = require("../controllers/generalInfoController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: General Info
 *   description: API endpoints for managing general info of the restaurant/cafe
 */

/**
 * @swagger
 * /api/general-info:
 *   post:
 *     summary: Create general info
 *     tags: [General Info]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               appBarType:
 *                 type: string
 *               backgroundImage:
 *                 type: string
 *               backgroundColor:
 *                 type: string
 *               cardColor:
 *                 type: string
 *               imagePlaceHolderColor:
 *                 type: string
 *               menuType:
 *                 type: string
 *               textColor:
 *                 type: string
 *             required:
 *               - name
 *               - appBarType
 *               - backgroundColor
 *               - cardColor
 *               - imagePlaceHolderColor
 *               - menuType
 *               - textColor
 *     responses:
 *       '201':
 *         description: General info created successfully
 *       '400':
 *         description: General info already exists
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post("/api/general-info", authMiddleware, createGeneralInfo);

/**
 * @swagger
 * /api/general-info:
 *   get:
 *     summary: Get general info
 *     tags: [General Info]
 *     responses:
 *       '200':
 *         description: General info retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.get("/api/general-info", getGeneralInfo);

/**
 * @swagger
 * /api/general-info:
 *   put:
 *     summary: Update general info
 *     tags: [General Info]
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               appBarType:
 *                 type: string
 *               backgroundImage:
 *                 type: string
 *               backgroundColor:
 *                 type: string
 *               cardColor:
 *                 type: string
 *               imagePlaceHolderColor:
 *                 type: string
 *               menuType:
 *                 type: string
 *               textColor:
 *                 type: string
 *             required:
 *               - name
 *               - appBarType
 *               - backgroundColor
 *               - cardColor
 *               - imagePlaceHolderColor
 *               - menuType
 *               - textColor
 *     responses:
 *       '200':
 *         description: General info updated successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.put("/api/general-info", authMiddleware, updateGeneralInfo);

module.exports = router;
