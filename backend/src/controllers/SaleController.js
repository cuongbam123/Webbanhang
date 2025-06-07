const SaleService = require('../services/SaleService').default;

module.exports = {
  index: async (req, res, next) => {
    try {
      const sales = await SaleService.getAllSales();
      res.json(sales);
    } catch (err) {
      next(err);
    }
  },

  show: async (req, res, next) => {
    try {
      const sale = await SaleService.getSaleById(req.params.id);
      if (!sale) return res.status(404).send('Không tìm thấy khuyến mãi');
      res.json(sale);
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      // req.body phải có _id, promotion, describe, status, start, end, id_product
      const newSale = await SaleService.createSale(req.body);
      res.status(201).json(newSale);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const updated = await SaleService.updateSale(req.params.id, req.body);
      if (!updated) return res.status(404).send('Không tìm thấy khuyến mãi để cập nhật');
      res.json(updated);
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      const deleted = await SaleService.deleteSale(req.params.id);
      if (!deleted) return res.status(404).send('Không tìm thấy khuyến mãi để xóa');
      res.json({ message: 'Xóa thành công' });
    } catch (err) {
      next(err);
    }
  }
};
