const bcrypt= require("bcryptjs")
const jwt= require("jsonwebtoken")
const User= require("../models/User")

// make a token for a user id
 const makeToken= (userId) => 
    jwt.sign({id:userId}, process.env.JWT_SECRET, {expiresIn:"7d"});

// post /api/auth/register
// sign controller

exports.register= async (req , res , next) => {
    try {
        const {name, email, password}= req.body;

        if (!name || !email || !password)
            return res.status(400).json({message: "All fields are required"});


        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already in use" });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        const token = makeToken(user._id);
        res.status(201).json({
            message: "Registered successfully",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        next(err);  
    }
};


//POST /api/auth/login
// Login Controller

exports.login = async (req, res, next) => {
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
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        next(err)
    }
};


// GET /api/auth/me (need login)

exports.me = async (req, res) => {
  res.json({ user: req.user }); // req.user comes from auth middleware
};