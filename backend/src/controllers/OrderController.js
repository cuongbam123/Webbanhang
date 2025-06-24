const Order = require('../models/Order');

// Tạo đơn hàng mới
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body });
    await newOrder.save();
    return res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    console.error('createOrder:', error);
    return res.status(500).json({ success: false, message: 'Lỗi tạo đơn hàng' });
  }
};

// Lấy tất cả đơn hàng
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('getAllOrders:', error);
    return res.status(500).json({ success: false, message: 'Lỗi lấy đơn hàng' });
  }
};

// Lấy đơn theo ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    return res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('getOrderById:', error);
    return res.status(500).json({ success: false, message: 'Lỗi lấy đơn hàng' });
  }
};

// Cập nhật trạng thái đơn hàng
exports.updateOrder = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('updateOrder:', error);
    return res.status(500).json({ success: false, message: 'Lỗi cập nhật đơn hàng' });
  }
};

// Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
    return res.status(200).json({ success: true, message: 'Đã xóa đơn hàng' });
  } catch (error) {
    console.error('deleteOrder:', error);
    return res.status(500).json({ success: false, message: 'Lỗi xóa đơn hàng' });
  }
};
