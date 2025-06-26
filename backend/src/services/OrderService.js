const Order = require("../models/order");
const DetailOrder = require("../models/detailOrder");
const { v4: uuidv4 } = require("uuid");

/**
 * Tạo đơn hàng và danh sách chi tiết đơn hàng
 * @param {Object} data - dữ liệu đơn hàng + danh sách sản phẩm
 * @returns { order, detailOrders }
 */
async function createOrder(data) {
  const { products, ...orderData } = data;

  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("Danh sách sản phẩm không hợp lệ");
  }

  const orderId = orderData._id || uuidv4();
  orderData._id = orderId;

  // Tạo đơn hàng
  const order = new Order(orderData);
  await order.save();

  // Tạo chi tiết đơn hàng
  const detailOrders = await Promise.all(
    products.map((item) => {
      if (!item.id_product)
        throw new Error("Thiếu id_product trong chi tiết sản phẩm");

      return new DetailOrder({
        _id: uuidv4(),
        id_order: orderId,
        id_product: item.id_product,
        name_product: item.name_product,
        price_product: item.price_product,
        count: item.count,
        size: item.size || "M",
      }).save();
    })
  );

  return { order, detailOrders };
}

// Các hàm cũ giữ nguyên
async function getAllOrders() {
  return await Order.find()
    .populate("id_user", "username fullname email")
    .populate("id_payment", "pay_name")
    .populate("id_note", "fullname phone content")
    .populate("id_coupon", "code promotion")
    .exec();
}

async function getOrderById(id) {
  return await Order.findById(id)
    .populate("id_user", "username fullname email")
    .populate("id_payment", "pay_name")
    .populate("id_note", "fullname phone content")
    .populate("id_coupon", "code promotion")
    .exec();
}

async function updateOrder(id, updates) {
  return await Order.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteOrder(id) {
  return await Order.findByIdAndDelete(id);
}

async function getOrdersByUser(userId) {
  return await Order.find({ id_user: userId })
    .populate("id_user", "username fullname email")
    .populate("id_payment", "pay_name")
    .populate("id_note", "fullname phone content")
    .populate("id_coupon", "code promotion")
    .exec();
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
};
