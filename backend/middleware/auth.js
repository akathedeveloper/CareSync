import jwt from 'jsonwebtoken'

export const isAuthenticated = function (req, res, next){
    const header= req.header("Authorization"); //looks like "Bearer <token>"
    const token= header?.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) return res.status(401).json({message:"No token. Unauthorized."});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: decoded.id };
        next();
    } catch (err){
        return res.status(401).json({ message: "Token invalid" });
    }
};