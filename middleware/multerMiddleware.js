const multer = require('multer');

// Set storage engine
const storage = multer.memoryStorage();

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

module.exports = upload;