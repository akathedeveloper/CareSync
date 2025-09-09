import bcrypt from 'bcryptjs'
import {User} from '../db/models/User.js'
import jwt from 'jsonwebtoken'

// make a token for a user id
 const makeToken= (userId) => 
    jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn:"7d"});

// post /api/auth/register
// sign controller

export const register= async (req , res , next) => {
    try {
        const {name, email, password, role = "patient"}= req.body;

        if (!name || !email || !password)
            return res.status(400).json({message: "All fields are required"});

        // Validate role
        if (!["patient", "doctor", "pharmacist"].includes(role)) {
            return res.status(400).json({message: "Invalid role specified"});
        }

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already in use" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed, role });

        const token = makeToken(user._id);
        res.status(201).json({
            message: "Registered successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        next(err);  
    }
};


//POST /api/auth/login
// Login Controller

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: "Invalid email or password" });

        const token = makeToken(user._id);
        res.json({
            message: "Logged in",
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        next(err)
    }
};


// GET /api/auth/me (need login)

export const me = async (req, res) => {
  res.json({ user: req.user }); // req.user comes from auth middleware
};