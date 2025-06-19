const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Public routes (if needed)
router.get('/', ProductController.index);
router.get('/:id', ProductController.show);

// Admin-only routes
router.post('/', verifyToken, isAdmin, ProductController.create);
router.put('/:id', verifyToken, isAdmin, ProductController.update);
router.delete('/:id', verifyToken, isAdmin, ProductController.remove);

module.exports = router;