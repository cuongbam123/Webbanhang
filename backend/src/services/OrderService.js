const Order = require('../models/order');

/**
 * Create a new order
 * @param {Object} data - order data
 */
async function createOrder(data) {
  const order = new Order(data);
  return await order.save();
}

/**
 * Get all orders
 */
async function getAllOrders() {
  return await Order.find()
    .populate('id_user', 'username fullname email')
    .populate('id_payment', 'pay_name')
    .populate('id_note', 'fullname phone')
    .populate('id_coupon', 'code promotion')
    .exec();
}

/**
 * Get order by ID
 * @param {String} id
 */
async function getOrderById(id) {
  return await Order.findById(id)
    .populate('id_user', 'username fullname email')
    .populate('id_payment', 'pay_name')
    .populate('id_note', 'fullname phone')
    .populate('id_coupon', 'code promotion')
    .exec();
}

/**
 * Update an order
 * @param {String} id
 * @param {Object} updates
 */
async function updateOrder(id, updates) {
  return await Order.findByIdAndUpdate(id, updates, { new: true });
}

/**
 * Delete an order
 * @param {String} id
 */
async function deleteOrder(id) {
  return await Order.findByIdAndDelete(id);
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};