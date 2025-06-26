const { Schema, model } = require('mongoose');

const couponSchema = new Schema({
  _id: String,
  code: { type: String, unique: true },
  promotion: Number
}, { collection: 'coupon' });

module.exports = model('Coupon', couponSchema);

