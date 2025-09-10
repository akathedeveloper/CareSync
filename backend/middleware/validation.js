// Input validation and sanitization middleware
export const validateInput = (req, res, next) => {
    // Sanitize request body
    if (req.body && typeof req.body === 'object') {
        sanitizeObject(req.body);
    }
    
    // Sanitize query parameters
    if (req.query && typeof req.query === 'object') {
        sanitizeObject(req.query);
    }
    
    next();
};

// Input sanitization helper
export function sanitizeObject(obj) {
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

// Rate limiting middleware
export const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
    const requests = new Map();
    
    return (req, res, next) => {
        const key = req.ip;
        const now = Date.now();
        
        if (!requests.has(key)) {
            requests.set(key, { count: 1, resetTime: now + windowMs });
        } else {
            const userData = requests.get(key);
            if (now > userData.resetTime) {
                userData.count = 1;
                userData.resetTime = now + windowMs;
            } else {
                userData.count++;
                if (userData.count > maxRequests) {
                    return res.status(429).json({
                        success: false,
                        message: 'Too many requests, please try again later'
                    });
                }
            }
        }
        
        next();
    };
};

// Validation rules for auth routes
export const validateAuth = {
    register: (req, res, next) => {
        const { name, email, password, role } = req.body;
        
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password'
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }
        
        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }
        
        // Validate name
        if (name.length < 2 || name.length > 50) {
            return res.status(400).json({
                success: false,
                message: 'Name must be between 2 and 50 characters'
            });
        }
        
        // Validate role
        if (role && !['patient', 'doctor', 'pharmacist'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Role must be either patient, doctor, or pharmacist'
            });
        }
        
        next();
    },
    
    login: (req, res, next) => {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }
        
        next();
    }
};

module.exports = {
    validateInput,
    rateLimit,
    validateAuth,
    sanitizeObject
};
