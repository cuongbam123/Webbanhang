const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { verifyToken, isAdmin } = require('../middlewares/auth');

// Đăng ký và đăng nhập
router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.put('/users/:id', verifyToken, UserController.updateUser);
router.get('/profile', verifyToken, UserController.getProfile);



// Route chỉ admin mới được truy cập
router.get('/admin/users', verifyToken, isAdmin, UserController.index);
router.get('/admin/users/:id', verifyToken, isAdmin, UserController.user);
// router.put('/admin/users/:id', verifyToken, isAdmin, UserController.updateUser);
router.delete('/admin/users/:id', verifyToken, isAdmin, UserController.deleteUser);

module.exports = router;
