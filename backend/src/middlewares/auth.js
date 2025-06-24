const jwt = require('jsonwebtoken');


// // Khi đăng nhập thành công
// const token = jwt.sign(
//   { _id: user._id, role: user.role }, // phải có cả _id và role
//   process.env.JWT_SECRET,
//   { expiresIn: '7d' }
// );

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    // decoded phải có _id và role nếu bạn đã encode từ lúc tạo token
    req.user = {
      id: decoded._id || decoded.id,  // tuỳ bạn lưu gì khi tạo token
      role: decoded.role
    };

    next();
  });
};


const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'You are not allowed' });
  }
  next();
};

module.exports = { verifyToken, isAdmin };
