const express  = require("express");
const dotenv   = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const saleRoutes = require('./routes/SaleRoutes');
const productRoutes = require('./routes/ProductRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const detailOrderRoutes = require('./routes/DetailOrderRoutes');

dotenv.config();
const app  = express();
const port = process.env.PORT || 3001;
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("✅ Kết nối DB thành công"))
  .catch(err => console.error("❌ Lỗi kết nối DB:", err));

// Mount routes
app.use("/api/users", userRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/detail-orders', detailOrderRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`🚀 Server chạy tại http://localhost:${port}`);
});
