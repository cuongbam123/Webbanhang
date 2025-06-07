const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname:    { type: String, required: true },
  username:    { type: String, required: true, unique: true },
  email:       { type: String, required: true, unique: true },
  password:    { type: String, required: true },
  // Bỏ required, thêm default nếu muốn gán quyền mặc định
  id_permission: { 
    type: Schema.Types.ObjectId, 
    ref: 'Permission', 
    required: false,
    // default: someDefaultPermissionId
  }
  // Không cần khai báo _id; Mongoose tự sinh
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
