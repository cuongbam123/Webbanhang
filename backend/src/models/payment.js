const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({
  _id: String,
  pay_name: String
}, { collection: 'payment' });

module.exports = model('Payment', paymentSchema);

