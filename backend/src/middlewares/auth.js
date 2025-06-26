const jwt = require('jsonwebtoken');

/**
 * Middleware kiểm tra token từ Header
 * Nếu hợp lệ sẽ gán thông tin user vào req.user
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = {
      id: decoded._id || decoded.id,
      role: decoded.role
    };

    next();
  });
};

/**
 * Middleware kiểm tra quyền admin
 */
const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'You are not allowed' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };

