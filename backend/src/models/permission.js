const { Schema, model } = require('mongoose');

const permissionSchema = new Schema({
  _id: { type: String, required: true },
  permission: { type: String, required: true }
}, { _id: false, collection: 'permission' });

module.exports = model('Permission', permissionSchema);
