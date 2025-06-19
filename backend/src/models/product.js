const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  // _id:           { type: String, required: true },
  name_product: { type: String },
  price_product:{ type: Number },
  image:        { type: String },
  describe:     { type: String },
  // gender:       { type: String },
  number:       { type: Number },
  id_category:  { type: String, ref: 'Category', required: true }
}, { collection: 'product' });

module.exports = model('Product', productSchema);


