require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authenticationRoutes = require("./routes/user");
const menuItemRoutes = require("./routes/menuItemRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const generalInfoRoutes = require("./routes/generalInfoRouts");
const uploadImageRoutes = require("./routes/uploadImageRoutes");
const path = require('path');

const { specs, swaggerUi } = require("./swagger");
const cors = require('cors');

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Middleware to set CORS headers for images
app.use('/api/menuItems/:id/image', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Middleware to set CORS headers for images
app.use('/api/general-info/background-image', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Middleware to set CORS headers for images
app.use('/images/:fileName', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Serve static files from the uploads directory
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Redirect root to /api-docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/authentication", authenticationRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/general-info', generalInfoRoutes);
app.use('/api/upload-image', uploadImageRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

