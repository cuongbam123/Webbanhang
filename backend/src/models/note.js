const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
  _id:      { type: String, required: true },
  fullname: { type: String },
  phone:    { type: String }
}, { _id: false, collection: 'note' });

module.exports = model('Note', noteSchema);
