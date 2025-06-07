const Sale = require('../models/sale');

const getAllSales = async () => {
  return await Sale.find();
};

const getSaleById = async (id) => {
  return await Sale.findById(id);
};

const createSale = async (data) => {
  // data phải chứa đủ _id, id_product,…
  return await Sale.create(data);
};

const updateSale = async (id, data) => {
  // trả về document mới sau cập nhật
  return await Sale.findByIdAndUpdate(id, data, { new: true });
};

const deleteSale = async (id) => {
  return await Sale.findByIdAndDelete(id);
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale
};
