// const express = require('express');

// const foodController = require('../controllers/food.controller'); // Include the controller

// const router = express.Router();

// // PUT /food/:id
// router.put('/:id', foodController.updateFood);
// app.post('/food', authVerify, foodController.addFood);

// module.exports = router;

const express = require('express');

const foodController = require('../controllers/food.controller'); // Include the controller
const auth = require('../auth/auth'); // Include your auth middleware

const router = express.Router();

router.post('/', auth.authVerify, foodController.addFood);
router.put('/:id', foodController.updateFood);
router.get('/', foodController.getAllFoods);

// POST /food (with auth middleware)

module.exports = router;
