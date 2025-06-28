
const express = require('express');
const router = express.Router();
const detailOrderController = require('../controllers/DetailOrderController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Tạo mới 1 detail order riêng lẻ
router.post('/', verifyToken, detailOrderController.createDetailOrder);

// Lấy toàn bộ chi tiết đơn hàng (admin)
router.get('/', verifyToken, isAdmin, detailOrderController.listDetailOrders);

// Lấy chi tiết theo ID
router.get('/:id', verifyToken, detailOrderController.getDetailOrder);

// Cập nhật chi tiết đơn hàng (admin)
router.put('/:id', verifyToken, isAdmin, detailOrderController.updateDetailOrder);

// Xoá chi tiết đơn hàng (admin)
router.delete('/:id', verifyToken, isAdmin, detailOrderController.deleteDetailOrder);

router.get('/order/:orderId', verifyToken, detailOrderController.getDetailOrdersByOrderId);


module.exports = router;
