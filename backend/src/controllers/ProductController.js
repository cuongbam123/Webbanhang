const ProductService = require('../services/ProductService');

module.exports = {
  // index: async (req, res, next) => {
  //   try {
  //     const { page = 1, limit = 20, sortBy = 'name_product', sortOrder = 'asc', search = '', id_category = '' } = req.query;

  //     const skip = (page - 1) * limit;
  //     const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

  //     let filter = {};
  //     if (search) filter.name_product = { $regex: search, $options: 'i' };
  //     if (id_category) filter.id_category = id_category;

  //     const products = await ProductService.getAllProducts(parseInt(limit), parseInt(skip), sort, filter);
  //     const total = await ProductService.countProducts(filter);

  //     res.json({ total, page: parseInt(page), limit: parseInt(limit), sortBy, sortOrder, search, id_category, data: products });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  index: async (req, res, next) => {
    try {
        const { sortBy = 'name_product', sortOrder = 'asc', search = '', id_category = '' } = req.query;

        const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

        let filter = {};
        if (search) {
            filter.name_product = { $regex: search, $options: 'i' };
        }
        if (id_category) {
            filter.id_category = id_category;
        }

        const products = await ProductService.getAllProducts(0, 0, sort, filter); // 0 nghĩa là lấy hết
        res.json({ data: products });
    } catch (err) {
        next(err);
    }
},


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

      console.log('Dữ liệu nhận từ FE:', req.body);
    console.log('Ảnh nhận từ FE:', req.file);

      const { name_product, price_product, describe, number, id_category } = req.body;

      let image = '';
      if (req.file) {
        image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }

      const newProduct = await ProductService.createProduct({
        name_product,
        price_product,
        image,
        describe,
        number,
        id_category
      });

      res.status(201).json(newProduct);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const updateData = req.body;

      if (req.file) {
        updateData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }

      const updatedProduct = await ProductService.updateProduct(req.params.id, updateData);
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
