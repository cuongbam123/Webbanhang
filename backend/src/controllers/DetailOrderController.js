
const detailService = require('../services/DetailOrderService');

// Tạo chi tiết đơn hàng riêng lẻ
exports.createDetailOrder = async (req, res, next) => {
  try {
    const data = req.body;
    const detail = await detailService.createDetailOrder(data);
    res.status(201).json(detail);
  } catch (err) {
    next(err);
  }
};

exports.listDetailOrders = async (req, res, next) => {
  try {
    const details = await detailService.getAllDetailOrders();
    res.json(details);
  } catch (err) {
    next(err);
  }
};

exports.getDetailOrder = async (req, res, next) => {
  try {
    const detail = await detailService.getDetailOrderById(req.params.id);
    if (!detail) return res.status(404).end();
    res.json(detail);
  } catch (err) {
    next(err);
  }
};

exports.updateDetailOrder = async (req, res, next) => {
  try {
    const detail = await detailService.updateDetailOrder(req.params.id, req.body);
    if (!detail) return res.status(404).end();
    res.json(detail);
  } catch (err) {
    next(err);
  }
};

exports.deleteDetailOrder = async (req, res, next) => {
  try {
    await detailService.deleteDetailOrder(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
