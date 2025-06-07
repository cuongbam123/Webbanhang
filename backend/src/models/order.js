const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  _id:         { type: String, required: true },
  address:    { type: String },
  total:      { type: Number },
  status:     { type: String },
  pay:        { type: Boolean },
  feeship:    { type: Number },
  create_time:{ type: Date, default: Date.now },
  id_user:     { type: String, ref: 'User', required: true },
  id_payment:  { type: String, ref: 'Payment', required: true },
  id_note:    { type: String, ref: 'Note' },
  id_coupon:  { type: String, ref: 'Coupon' }
}, { collection: 'order' });

module.exports = model('Order', orderSchema);
