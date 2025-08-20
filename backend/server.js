const express= require("express");
const cors= require("cors")
const morgan= require("morgan")
const dotenv= require("dotenv")
const connectDB = require("./config/db")
const authRoutes= require("./routes/authRoutes")
const {notFound, errorHandler}= require("./middleware/error")

dotenv.config();
connectDB();

const app= express();

// Global input validation middleware
app.use(express.json({ limit: '10mb' })); // Limit JSON body size
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Limit URL encoded body size

// Custom input sanitization middleware
app.use((req, res, next) => {
    // Sanitize request body
    if (req.body && typeof req.body === 'object') {
        sanitizeObject(req.body);
    }
    
    // Sanitize query parameters
    if (req.query && typeof req.query === 'object') {
        sanitizeObject(req.query);
    }
    
    // Validate content type
    if (req.method !== 'GET' && !req.is('json') && !req.is('application/x-www-form-urlencoded')) {
        return res.status(415).json({
            success: false,
            message: 'Unsupported content type. Please use application/json'
        });
    }
    
    next();
});

// CORS configuration (restrictive)
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(morgan("dev")); //log requests in console

// Input validation helper functions
function sanitizeObject(obj) {
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            // Remove potential XSS vectors
            obj[key] = obj[key]
                .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                .replace(/javascript:/gi, '')
                .replace(/on\w+\s*=/gi, '')
                .trim();
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitizeObject(obj[key]);
        }
    }
}

// Rate limiting middleware (basic implementation)
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 100;

app.use((req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    
    if (!requestCounts.has(key)) {
        requestCounts.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    } else {
        const userData = requestCounts.get(key);
        if (now > userData.resetTime) {
            userData.count = 1;
            userData.resetTime = now + RATE_LIMIT_WINDOW;
        } else {
            userData.count++;
            if (userData.count > MAX_REQUESTS) {
                return res.status(429).json({
                    success: false,
                    message: 'Too many requests, please try again later'
                });
            }
        }
    }
    
    next();
});

// simple health route check server alive
app.get("/health", (req, res) => {
    res.json({status: "backend is running"});
});

// auth routes start with /api/auth

app.use("/api/auth", authRoutes);

// 404 + error handlers

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))