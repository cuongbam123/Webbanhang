const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");
const { verifyToken, isAdmin } = require("../middlewares/auth");

// Tạo đơn hàng (người dùng)
router.post("/", verifyToken, orderController.createOrder);

// Lấy tất cả đơn hàng (admin)
router.get("/", verifyToken, isAdmin, orderController.getAllOrders);

// Lấy đơn hàng theo ID (user hoặc admin)
router.get("/:id", verifyToken, orderController.getOrderById);

// Cập nhật đơn hàng (admin)
router.put("/:id", verifyToken, isAdmin, orderController.updateOrder);

// Xoá đơn hàng (admin)
router.delete("/:id", verifyToken, isAdmin, orderController.deleteOrder);

// Lấy danh sách đơn hàng của user hiện tại
router.get("/my", verifyToken, orderController.getOrdersByUser);

module.exports = router;
