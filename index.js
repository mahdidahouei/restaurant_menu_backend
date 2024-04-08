require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const { specs, swaggerUi } = require("./swagger");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Redirect root to /api-docs
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menuItems", menuItemRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// TODO: remove this

const bcrypt = require("bcryptjs");

const password = "1403RamzoRaz1403";
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

console.log(hashedPassword);
