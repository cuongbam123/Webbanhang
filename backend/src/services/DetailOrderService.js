const DetailOrder = require('../models/detailOrder');

async function createDetailOrder(data) {
  const detail = new DetailOrder(data);
  return await detail.save();
}

async function getAllDetailOrders() {
  return await DetailOrder.find()
    .populate('id_order')
    .populate('id_product')
    .exec();
}

async function getDetailOrdersByOrderId(orderId) {
  return await DetailOrder.find({ id_order: orderId })
    .populate('id_product', 'name_product price_product')
    .exec();
}


async function getDetailOrderById(id) {
  return await DetailOrder.findById(id)
    .populate('id_order')
    .populate('id_product')
    .exec();
}

async function updateDetailOrder(id, updates) {
  return await DetailOrder.findByIdAndUpdate(id, updates, { new: true });
}

async function deleteDetailOrder(id) {
  return await DetailOrder.findByIdAndDelete(id);
}

module.exports = {
  createDetailOrder,
  getAllDetailOrders,
  getDetailOrderById,
  updateDetailOrder,
  deleteDetailOrder,
  getDetailOrdersByOrderId
};
