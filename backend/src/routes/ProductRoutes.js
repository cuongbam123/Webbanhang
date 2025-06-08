// Nhập module express
const express = require('express');

// Tạo một đối tượng router mới
const router = express.Router();

// Nhập controller xử lý các logic liên quan đến sản phẩm
const ProductController = require('../controllers/ProductController');

// Tuyến đường để lấy danh sách tất cả sản phẩm (HTTP GET đến '/')
router.get('/', ProductController.index);

// Tuyến đường để lấy thông tin chi tiết của một sản phẩm theo ID (HTTP GET đến '/:id')
router.get('/:id', ProductController.show);

// Tuyến đường để tạo một sản phẩm mới (HTTP POST đến '/')
router.post('/', ProductController.create);

// Tuyến đường để cập nhật thông tin sản phẩm theo ID (HTTP PUT đến '/:id')
router.put('/:id', ProductController.update);

// Tuyến đường để xóa một sản phẩm theo ID (HTTP DELETE đến '/:id')
router.delete('/:id', ProductController.remove);

// Xuất router để sử dụng ở các phần khác trong ứng dụng
module.exports = router;
