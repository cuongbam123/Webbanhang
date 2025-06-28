const express = require("express");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const setupChatAI = require("./chatAI");
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const saleRoutes = require('./routes/SaleRoutes');
const productRoutes = require('./routes/ProductRoutes');
const orderRoutes = require('./routes/OrderRoutes');
const detailOrderRoutes = require('./routes/DetailOrderRoutes');
const uploadRoutes = require('./routes/UploadRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const couponRoutes = require("./routes/CouponRoutes");
const noteRoutes = require("./routes/NoteRoutes");
const paypalRoutes = require("./routes/PaypalRoutes");


//Cấu hình cors
// const cors = require("cors");


// Load env
dotenv.config();
const app = express();
const server = http.createServer(app); // ✅ tạo server từ express
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend chạy ở 3000
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 3001;

// Gọi socket setup
setupChatAI(io);

// app.use(cors({
//   origin: "http://localhost:3000", // hoặc "*" nếu là dev nội bộ
//   credentials: true
// }));


// app.use('/uploads', express.static('uploads'));
// app.use('/images', express.static('src/images'));
// app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/uploads', express.static('uploads'));



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
  origin: ['http://localhost:3000', 'http://localhost:3002'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
// // Route import
// const userRoutes = require("./routes/UserRoutes");
// const saleRoutes = require("./routes/SaleRoutes");
// const productRoutes = require("./routes/ProductRoutes");
// const orderRoutes = require("./routes/OrderRoutes");
// const detailOrderRoutes = require("./routes/DetailOrderRoutes");

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/detail-orders", detailOrderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/paypal', paypalRoutes);




// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Lắng nghe server
server.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});