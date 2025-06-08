const DetailOrder = require('../models/detailOrder');

/**
 * Create a new detail order
 * @param {Object} data - detail order data
 */
async function createDetailOrder(data) {
  const detail = new DetailOrder(data);
  return await detail.save();
}

/**
 * Get all detail orders
 */
async function getAllDetailOrders() {
  return await DetailOrder.find()
    .populate('id_order')
    .populate('id_product')
    .exec();
}

/**
 * Get detail order by ID
 * @param {String} id
 */
async function getDetailOrderById(id) {
  return await DetailOrder.findById(id)
    .populate('id_order')
    .populate('id_product')
    .exec();
}

/**
 * Update a detail order
 * @param {String} id
 * @param {Object} updates
 */
async function updateDetailOrder(id, updates) {
  return await DetailOrder.findByIdAndUpdate(id, updates, { new: true });
}

/**
 * Delete a detail order
 * @param {String} id
 */
async function deleteDetailOrder(id) {
  return await DetailOrder.findByIdAndDelete(id);
}

module.exports = {
  createDetailOrder,
  getAllDetailOrders,
  getDetailOrderById,
  updateDetailOrder,
  deleteDetailOrder
};