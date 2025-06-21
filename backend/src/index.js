const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load env
dotenv.config();

// Khởi tạo app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware để parse JSON
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("✅ Kết nối DB thành công"))
  .catch(err => console.error("❌ Lỗi kết nối DB:", err));

// Middleware để log request

// Cấu hình CORS
const cors = require("cors");
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
// Route import
const userRoutes = require("./routes/UserRoutes");
const saleRoutes = require("./routes/SaleRoutes");
const productRoutes = require("./routes/ProductRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const detailOrderRoutes = require("./routes/DetailOrderRoutes");
const paymentRoutes = require('./routes/PaymentRoutes');

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/detail-orders", detailOrderRoutes);
app.use('/api/payment', paymentRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Lắng nghe server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
