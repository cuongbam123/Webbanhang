const Product = require('../models/product');

// const getAllProducts = async (limit, skip, sort, filter) =>
//   await Product.find(filter).sort(sort).limit(limit || 0).skip(skip);

const getAllProducts = async (limit, skip, sort, filter) =>
  await Product.find(filter, { _id: 1, name_product: 1, price_product: 1, image: 1, describe: 1, number: 1, id_category: 1 })
    .sort(sort)
    .limit(limit || 0)
    .skip(skip);


const countProducts = async (filter) => await Product.countDocuments(filter);
const getProductById = async (id) => await Product.findById(id);
const createProduct = async (data) => await Product.create(data);
const updateProduct = async (id, data) => await Product.findByIdAndUpdate(id, data, { new: true });
const deleteProduct = async (id) => await Product.findByIdAndDelete(id);

module.exports = {
  getAllProducts,
  countProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
