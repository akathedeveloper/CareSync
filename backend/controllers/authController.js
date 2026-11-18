import bcrypt from 'bcryptjs'
import {User} from '../db/models/User.js'
import jwt from 'jsonwebtoken'
import ErrorHandler from '../utils/errorHandler.js';
import catchAsync from '../middleware/catchAsyncError.js'

// make a token for a user id
 const makeToken= (userId) => 
    jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn:"7d"});

// post /api/auth/register
// sign controller

export const register = catchAsync(async (req , res , next) => {
        const {name, email, password}= req.body;

        if (!name || !email || !password)
            return next(new ErrorHandler("All fields are required", 400))

        // Self-service registration always creates a patient account.
        // Elevated roles (doctor, pharmacist) must be provisioned through a
        // separate verified path and must not be settable from client input.
        const role = "patient";

        const exists = await User.findOne({ email });
        if (exists) return next(new ErrorHandler("Email already in use", 400));

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, role });

        const token = makeToken(user._id);
        res.status(201).json({
            message: "Registered successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
});
//POST /api/auth/login
// Login Controller

export const login = catchAsync(async (req, res, next) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)  return next(new ErrorHandler("Invalid Email or Password", 400));

        const ok = await bcrypt.compare(password, user.password);
        if (!ok)  return next(new ErrorHandler("Invalid Email or Password", 400));

        const token = makeToken(user._id);
        res.json({
            message: "Logged in",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
});


// GET /api/auth/me (need login)

export const me = async (req, res) => {
  res.json({ user: req.user }); // req.user comes from auth middleware
};