const orderService = require("../services/OrderService");

// Tạo đơn hàng kèm chi tiết và trả về kết quả đầy đủ
exports.createOrder = async (req, res) => {
  try {
    const data = { ...req.body, id_user: req.user.id }; // Gắn user từ token (hoặc thay đổi nếu chưa đăng nhập)
    const { order, detailOrders } = await orderService.createOrder(data);
    // res.status(201).json({ success: true, order, detailOrders });
    // res.status(201).json({ success: true, order: newOrder });
    return res.status(201).json({ success: true, order, detailOrders });
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ success: false, message: "Lỗi tạo đơn hàng" });
  }
};

// Lấy tất cả đơn hàng (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error("getAllOrders error:", err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi lấy danh sách đơn hàng" });
  }
};

// Lấy đơn hàng theo ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng" });

    // Nếu không phải admin thì chỉ xem được đơn của chính mình
    if (req.user.role !== "admin" && order.id_user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Không có quyền truy cập đơn hàng này",
        });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    console.error("getOrderById error:", err);
    res.status(500).json({ success: false, message: "Lỗi lấy đơn hàng" });
  }
};

// Cập nhật đơn hàng (admin)
exports.updateOrder = async (req, res) => {
  try {
    const updated = await orderService.updateOrder(req.params.id, req.body);
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng" });

    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.error("updateOrder error:", err);
    res.status(500).json({ success: false, message: "Lỗi cập nhật đơn hàng" });
  }
};

// Xóa đơn hàng (admin)
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await orderService.deleteOrder(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng" });

    res.status(200).json({ success: true, message: "Xóa đơn hàng thành công" });
  } catch (err) {
    console.error("deleteOrder error:", err);
    res.status(500).json({ success: false, message: "Lỗi xóa đơn hàng" });
  }
};
