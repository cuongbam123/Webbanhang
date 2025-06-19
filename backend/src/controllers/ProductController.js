const ProductService = require('../services/ProductService');

module.exports = {
  // Lấy danh sách sản phẩm: phân trang + sắp xếp + tìm kiếm
  index: async (req, res, next) => {
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = 'name_product',
        sortOrder = 'asc',
        search = '' // 🔍 Tên sản phẩm cần tìm kiếm (nếu có)
      } = req.query;

      const skip = (page - 1) * limit;
      const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
      const filter = search ? { name_product: { $regex: search, $options: 'i' } } : {}; // 🔍 Tạo điều kiện tìm kiếm theo tên

      const products = await ProductService.getAllProducts(parseInt(limit), parseInt(skip), sort, filter);
      const total = await ProductService.countProducts(filter);

      res.json({
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        sortBy,
        sortOrder,
        search,
        data: products
      });
    } catch (err) {
      next(err);
    }
  },

  // Các hàm show, create, update, remove 
  show: async (req, res, next) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) return res.status(404).send('Không tìm thấy sản phẩm');
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const updatedProduct = await ProductService.updateProduct(req.params.id, req.body);
      if (!updatedProduct) return res.status(404).send('Không tìm thấy sản phẩm');
      res.json(updatedProduct);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      const deleted = await ProductService.deleteProduct(req.params.id);
      if (!deleted) return res.status(404).send('Không tìm thấy sản phẩm');
      res.json({ message: 'Xóa thành công' });
    } catch (err) {
      next(err);
    }
  },
};