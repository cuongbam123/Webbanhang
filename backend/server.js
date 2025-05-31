// backend/index.js
const express = require('express');
const app = express();

// Middleware parse JSON
app.use(express.json());

// Route thử
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Chào từ server Node.js!' });
});

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server chạy ở http://localhost:${PORT}`);
});
