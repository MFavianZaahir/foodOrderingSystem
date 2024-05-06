// const express = require('express');

// const foodController = require('../controllers/food.controller'); // Include the controller

// const router = express.Router();

// // PUT /food/:id
// router.put('/:id', foodController.updateFood);
// app.post('/food', authVerify, foodController.addFood);

// module.exports = router;

const express = require('express');

const foodController = require('../controllers/food.controller'); // Include the controller
const authVerify = require('../auth/auth'); // Include your auth middleware

const router = express.Router();

// PUT /food/:id
router.put('/:id', foodController.updateFood);

// POST /food (with auth middleware)
router.post('/food', authVerify, foodController.addFood);

module.exports = router;
