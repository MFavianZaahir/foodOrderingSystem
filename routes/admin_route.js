const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin_controller'); // Assuming your controller is in userController.js

// Route for user registration (POST request) with validation middleware (replace with your actual validation logic)
router.post('/register', adminController.registerAdmin);

// Route for user login (POST request)
router.post('/login', adminController.login);

// Route for retrieving all users (implement authorization middleware here)
router.get('/all', adminController.getAllAdmin);

// Add other user management routes here (e.g., update, delete)

module.exports = router;
