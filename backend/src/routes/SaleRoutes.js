const express = require('express');
const router = express.Router();
const SaleController = require('../controllers/SaleController');

// Lấy tất cả khuyến mãi
router.get('/', SaleController.index);

// Lấy chi tiết khuyến mãi theo id
router.get('/:id', SaleController.show);

// Tạo mới khuyến mãi
router.post('/', SaleController.create);

// Cập nhật khuyến mãi theo id
router.put('/:id', SaleController.update);

// Xóa khuyến mãi theo id
router.delete('/:id', SaleController.remove);

module.exports = router;
