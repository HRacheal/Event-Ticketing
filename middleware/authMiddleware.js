const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  // roles = array of allowed roles, e.g. ['admin']
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) return res.status(401).json({ message: 'No token provided' });

      const token = authHeader.split(' ')[1]; // Bearer <token>
      if (!token) return res.status(401).json({ message: 'Token missing' });

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // { id, role }

      // Check role
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access forbidden: insufficient rights' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token', error: err.message });
    }
  };
};

module.exports = authMiddleware;
