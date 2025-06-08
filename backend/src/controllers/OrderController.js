const orderService = require('../services/OrderService');

/** POST /orders */
async function createOrder(req, res, next) {
  try {
    const data = req.body;
    const order = await orderService.createOrder(data);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

/** GET /orders */
async function listOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
}

/** GET /orders/:id */
async function getOrder(req, res, next) {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).end();
    res.json(order);
  } catch (err) {
    next(err);
  }
}

/** PUT /orders/:id */
async function updateOrder(req, res, next) {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);
    if (!order) return res.status(404).end();
    res.json(order);
  } catch (err) {
    next(err);
  }
}

/** DELETE /orders/:id */
async function deleteOrder(req, res, next) {
  try {
    await orderService.deleteOrder(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createOrder,
  listOrders,
  getOrder,
  updateOrder,
  deleteOrder
};
