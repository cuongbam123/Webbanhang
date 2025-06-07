const { Schema, model } = require('mongoose');

const couponSchema = new Schema({
  _id:        { type: String, required: true },
  code:       { type: String },
  count:      { type: Number },
  promotion:  { type: Number },
  describe:   { type: String }
}, { _id: false, collection: 'coupon' });

module.exports = model('Coupon', couponSchema);
