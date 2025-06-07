const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  _id:        { type: String, required: true },
  content:   { type: String },
  star:      { type: Number },
  id_user:    { type: String, ref: 'User', required: true },
  id_product: { type: String, ref: 'Product', required: true }
}, { collection: 'comment' });

module.exports = model('Comment', commentSchema);
