const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
  _id:        { type: String, required: true },
  id_user:    { type: String, ref: 'User', required: true },
  id_product: { type: String, ref: 'Product', required: true }
}, { collection: 'favorite' });

module.exports = model('Favorite', favoriteSchema);
