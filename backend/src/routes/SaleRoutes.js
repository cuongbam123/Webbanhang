// Nhập module express
const express = require('express');

// Tạo một đối tượng router mới
const router = express.Router();

// Nhập controller xử lý các logic liên quan đến khuyến mãi
const SaleController = require('../controllers/SaleController');

// Tuyến đường lấy tất cả các khuyến mãi (HTTP GET đến '/')
router.get('/', SaleController.index);

// Tuyến đường lấy chi tiết một khuyến mãi theo ID (HTTP GET đến '/:id')
router.get('/:id', SaleController.show);

// Tuyến đường tạo mới một khuyến mãi (HTTP POST đến '/')
router.post('/', SaleController.create);

// Tuyến đường cập nhật khuyến mãi theo ID (HTTP PUT đến '/:id')
router.put('/:id', SaleController.update);

// Tuyến đường xóa khuyến mãi theo ID (HTTP DELETE đến '/:id')
router.delete('/:id', SaleController.remove);

// Xuất router để sử dụng trong các phần khác của ứng dụng
module.exports = router;
