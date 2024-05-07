const express = require('express');

const foodController = require('../controllers/food.controller'); // Include the controller
const auth = require('../auth/auth'); // Include your auth middleware

const router = express.Router();

router.post('/', auth.authVerify, foodController.addFood);
router.put('/:id', auth.authVerify, foodController.updateFood);
router.get('/', foodController.getAllFoods);
router.delete('/:id', auth.authVerify, foodController.deleteFood);

// POST /food (with auth middleware)

module.exports = router;
