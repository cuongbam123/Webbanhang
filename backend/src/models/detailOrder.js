const { Schema, model } = require('mongoose');

const detailOrderSchema = new Schema({
  _id:           { type: String, required: true },
  price_product:{ type: Number },
  name_product: { type: String },
  count:        { type: Number },
  size:         { type: String },
  id_order:      { type: String, ref: 'Order', required: true },
  id_product:    { type: String, ref: 'Product', required: true }
}, { collection: 'detail_order' });

module.exports = model('DetailOrder', detailOrderSchema);
