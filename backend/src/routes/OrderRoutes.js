const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// CREATE
router.post('/', verifyToken, OrderController.createOrder);

// READ
router.get('/', verifyToken, isAdmin, OrderController.getAllOrders);
router.get('/:id', verifyToken, OrderController.getOrderById);

// UPDATE
router.put('/:id', verifyToken, isAdmin, OrderController.updateOrder);

// DELETE
router.delete('/:id', verifyToken, isAdmin, OrderController.deleteOrder);

module.exports = router;
