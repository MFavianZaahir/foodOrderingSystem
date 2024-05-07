const express = require(`express`);
const router = express.Router();
const orderController = require(`../controllers/order.controller`);
const auth = require(`../auth/auth`)

// router.post("/add", orderController.createOrder);
router.get("/getall", auth.authVerify,orderController.getAllorder);
router.post("/add", orderController.addOrder);

module.exports = router;