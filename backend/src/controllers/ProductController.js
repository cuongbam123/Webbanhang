const ProductService = require('../services/ProductService');

module.exports = {
  // GET /api/products
  index: async (req, res, next) => {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/products/:id
  show: async (req, res, next) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      if (!product) return res.status(404).send('Không tìm thấy sản phẩm');
      res.json(product);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/products
  create: async (req, res, next) => {
    try {
      const newProduct = await ProductService.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/products/:id
  update: async (req, res, next) => {
    try {
      const updated = await ProductService.updateProduct(req.params.id, req.body);
      if (!updated) return res.status(404).send('Không tìm thấy sản phẩm để cập nhật');
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/products/:id
  remove: async (req, res, next) => {
    try {
      const deleted = await ProductService.deleteProduct(req.params.id);
      if (!deleted) return res.status(404).send('Không tìm thấy sản phẩm để xóa');
      res.json({ message: 'Xóa sản phẩm thành công' });
    } catch (err) {
      next(err);
    }
  }
};
