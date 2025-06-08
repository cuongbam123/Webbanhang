const express = require('express');
const router = express.Router();
const detailController = require('../controllers/DetailOrderController');

router.post('/', detailController.createDetailOrder);
router.get('/', detailController.listDetailOrders);
router.get('/:id', detailController.getDetailOrder);
router.put('/:id', detailController.updateDetailOrder);
router.delete('/:id', detailController.deleteDetailOrder);

module.exports = router;
