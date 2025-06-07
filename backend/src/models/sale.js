const { Schema, model } = require('mongoose');

const saleSchema = new Schema({
  _id:        { type: String, required: true },
  promotion: { type: Number },
  describe:  { type: String },
  status:    { type: Boolean },
  start:     { type: Date },
  end:       { type: Date },
  id_product:{ type: String, ref: 'Product', required: true }
}, { collection: 'sale' });

module.exports = model('Sale', saleSchema);
