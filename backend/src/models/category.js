const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // 💡 dùng "name" thay vì "category"
}, { timestamps: true, collection: "categories" });

module.exports = mongoose.model("Category", CategorySchema);
