const detailService = require('../services/DetailOrderService');

/** POST /detail-orders */
async function createDetailOrder(req, res, next) {
  try {
    const data = req.body;
    const detail = await detailService.createDetailOrder(data);
    res.status(201).json(detail);
  } catch (err) {
    next(err);
  }
}

/** GET /detail-orders */
async function listDetailOrders(req, res, next) {
  try {
    const details = await detailService.getAllDetailOrders();
    res.json(details);
  } catch (err) {
    next(err);
  }
}

/** GET /detail-orders/:id */
async function getDetailOrder(req, res, next) {
  try {
    const detail = await detailService.getDetailOrderById(req.params.id);
    if (!detail) return res.status(404).end();
    res.json(detail);
  } catch (err) {
    next(err);
  }
}

/** PUT /detail-orders/:id */
async function updateDetailOrder(req, res, next) {
  try {
    const detail = await detailService.updateDetailOrder(req.params.id, req.body);
    if (!detail) return res.status(404).end();
    res.json(detail);
  } catch (err) {
    next(err);
  }
}

/** DELETE /detail-orders/:id */
async function deleteDetailOrder(req, res, next) {
  try {
    await detailService.deleteDetailOrder(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createDetailOrder,
  listDetailOrders,
  getDetailOrder,
  updateDetailOrder,
  deleteDetailOrder
};