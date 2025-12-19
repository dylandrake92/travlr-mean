// FILE: app_api/controllers/auth.js
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = '1h';

const login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const user = await User.findOne({ email }).lean(false);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await user.validatePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { sub: user._id.toString(), email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
  return res.status(200).json({ token, name: user.name, email: user.email });
};

const register = async (req, res) => {
  const { email, name, password } = req.body || {};
  if (!email || !name || !password) return res.status(400).json({ message: 'email, name, password required' });
  const exists = await User.findOne({ email }).lean();
  if (exists) return res.status(409).json({ message: 'User exists' });

  const model = mongoose.model('users');
  const user = new model({ email, name, hash: 'x' });
  await user.setPassword(password);
  await user.save();
  return res.status(201).json({ email, name });
};

const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization || '';
  const [scheme, token] = auth.split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { login, register, requireAuth };
