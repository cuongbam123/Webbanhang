const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  _id:      { type: String, required: true },
  category: { type: String, required: true }
}, { _id: false, collection: 'category' });

module.exports = model('Category', categorySchema);
