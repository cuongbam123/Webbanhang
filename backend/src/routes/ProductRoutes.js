const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Lấy danh sách sản phẩm
router.get('/', ProductController.index);

// Lấy chi tiết 1 sản phẩm theo id
router.get('/:id', ProductController.show);

// Tạo mới sản phẩm
router.post('/', ProductController.create);

// Cập nhật sản phẩm theo id
router.put('/:id', ProductController.update);

// Xóa sản phẩm theo id
router.delete('/:id', ProductController.remove);

module.exports = router;
