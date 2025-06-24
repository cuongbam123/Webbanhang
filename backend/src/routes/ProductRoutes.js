const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { verifyToken, isAdmin } = require('../middlewares/auth');
const multer = require('multer');

// Cấu hình lưu file với multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder để lưu ảnh
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Public routes
router.get('/', ProductController.index);
router.get('/:id', ProductController.show);

// Admin-only routes
router.post('/', verifyToken, isAdmin, upload.single('image'), ProductController.create);
router.put('/:id', verifyToken, isAdmin, upload.single('image'), ProductController.update);
router.delete('/:id', verifyToken, isAdmin, ProductController.remove);

module.exports = router;
