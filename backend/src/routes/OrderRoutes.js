const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

// Create a new order
router.post('/', orderController.createOrder);

// List all orders
router.get('/', orderController.listOrders);

// Get single order
router.get('/:id', orderController.getOrder);

// Update order
router.put('/:id', orderController.updateOrder);

// Delete order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
