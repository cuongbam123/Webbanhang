// Nhập module express
const express = require('express');

// Tạo một đối tượng router mới
const router = express.Router();

// Nhập controller xử lý các logic liên quan đến đơn hàng
const orderController = require('../controllers/OrderController');

// Tuyến đường để tạo một đơn hàng mới (yêu cầu HTTP POST đến '/')
router.post('/', orderController.createOrder);

// Tuyến đường để lấy danh sách tất cả đơn hàng (yêu cầu HTTP GET đến '/')
router.get('/', orderController.listOrders);

// Tuyến đường để lấy thông tin chi tiết của một đơn hàng cụ thể theo ID (yêu cầu HTTP GET đến '/:id')
router.get('/:id', orderController.getOrder);

// Tuyến đường để cập nhật đơn hàng theo ID (yêu cầu HTTP PUT đến '/:id')
router.put('/:id', orderController.updateOrder);

// Tuyến đường để xóa một đơn hàng theo ID (yêu cầu HTTP DELETE đến '/:id')
router.delete('/:id', orderController.deleteOrder);

// Xuất router để sử dụng ở các phần khác trong ứng dụng
module.exports = router;

