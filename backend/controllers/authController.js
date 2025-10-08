import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../db/models/User.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsync from '../middleware/catchAsyncError.js';

// 🔐 Generate JWT for internal use (not Firebase)
const makeToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

// 📝 POST /api/auth/register
export const register = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'patient' } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler('All fields are required', 400));
  }

  if (!['patient', 'doctor', 'pharmacist'].includes(role)) {
    return next(new ErrorHandler('Invalid role specified', 400));
  }

  const exists = await User.findOne({ email });
  if (exists) return next(new ErrorHandler('Email already in use', 400));

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, role });

  const token = makeToken(user._id);
  res.status(201).json({
    message: 'Registered successfully',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// 🔐 POST /api/auth/login
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new ErrorHandler('Invalid Email or Password', 400));

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return next(new ErrorHandler('Invalid Email or Password', 400));

  const token = makeToken(user._id);
  res.json({
    message: 'Logged in',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

// 🧾 GET /api/auth/me (requires Firebase token middleware)
export const me = async (req, res) => {
  try {
    const uid = req.user?.uid; // set by Firebase token middleware
    if (!uid) return res.status(401).json({ error: 'Missing UID from token' });

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error('Error in /me:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};