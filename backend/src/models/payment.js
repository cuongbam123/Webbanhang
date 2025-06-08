const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
  _id:      { type: String, required: true },
  pay_name: { type: String, required: true }
}, { _id: false, collection: 'payment' });

module.exports = model('Payment', paymentSchema);
