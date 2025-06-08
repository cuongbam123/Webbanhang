const Product = require('../models/product');

const getAllProducts = async () => {
  return await Product.find();
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const createProduct = async (data) => {
  // data phải chứa _id, id_category,…
  return await Product.create(data);
};

const updateProduct = async (id, data) => {
  // trả về document mới sau cập nhật
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
