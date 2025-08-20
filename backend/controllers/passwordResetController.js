const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const PasswordReset = require('../models/PasswordReset');
const nodemailer = require('nodemailer');

// Configure nodemailer (you should update with your email settings)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email address'
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

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal if user exists or not
            return res.status(200).json({
                success: true,
                message: 'If an account with that email exists, a password reset link has been sent'
            });
        }

        // Delete any existing password reset tokens for this user
        await PasswordReset.deleteMany({ userId: user._id });

        // Generate secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        // Hash the token before storing in database
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set expiration time (1 hour from now)
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        // Create password reset record
        await PasswordReset.create({
            userId: user._id,
            token: hashedToken,
            expiresAt
        });

        // Create reset URL
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        // Email message
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please click on the following link to reset your password:</p>
            <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
        `;

        try {
            await transporter.sendMail({
                to: user.email,
                subject: 'Password Reset Request',
                html: message
            });

            res.status(200).json({
                success: true,
                message: 'If an account with that email exists, a password reset link has been sent'
            });
        } catch (emailError) {
            console.error('Email send error:', emailError);
            res.status(500).json({
                success: false,
                message: 'Email could not be sent'
            });
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// POST /api/auth/reset-password/:token
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a new password'
            });
        }

        // Validate password strength
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        // Hash the provided token to match with stored token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find valid reset token
        const passwordReset = await PasswordReset.findOne({
            token: hashedToken,
            expiresAt: { $gt: Date.now() },
            used: false
        });

        if (!passwordReset) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Find user
        const user = await User.findById(passwordReset.userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        // Mark token as used
        passwordReset.used = true;
        await passwordReset.save();

        // Delete all reset tokens for this user
        await PasswordReset.deleteMany({ userId: user._id });

        res.status(200).json({
            success: true,
            message: 'Password reset successful'
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// GET /api/auth/verify-reset-token/:token
exports.verifyResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const passwordReset = await PasswordReset.findOne({
            token: hashedToken,
            expiresAt: { $gt: Date.now() },
            used: false
        });

        if (!passwordReset) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Token is valid'
        });
    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
