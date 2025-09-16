import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { User } from '../db/models/User.js'
import nodemailer from 'nodemailer'
import PasswordReset from '../db/models/PasswordReset.js'
import catchAsync from '../middleware/catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'

// Configure nodemailer (you should update with your email settings)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// POST /api/auth/forgot-password
export const forgotPassword = catchAsync(async (req, res, next) => {
        const { email } = req.body;

        if (!email) {
            return next(new ErrorHandler("Please provide an Email address", 400));
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next(new ErrorHandler("Please provide a valid email address", 400));
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal if user exists or not
            return next(new ErrorHandler("If an account with that email exists, a password reset link has been sent", 200))
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
            await transporter.sendMail({
                to: user.email,
                subject: 'Password Reset Request',
                html: message
            });

            res.status(200).json({
                success: true,
                message: 'If an account with that email exists, a password reset link has been sent'
            });
})

// POST /api/auth/reset-password/:token
export const resetPassword = catchAsync(async (req, res, next) => {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return next(new ErrorHandler("Please provide a new password", 404))
        }

        // Validate password strength
        if (password.length < 8) {
            return next(new ErrorHandler("Password must be at least 8 character long", 400))
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
            return next(new ErrorHandler("Invalid or expired reset token", 400))
        }

        // Find user
        const user = await User.findById(passwordReset.userId);
        if (!user) {
            return next(new ErrorHandler("User not found", 400))
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
})

// GET /api/auth/verify-reset-token/:token
export const verifyResetToken = catchAsync(async (req, res, next) => {
        const { token } = req.params;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const passwordReset = await PasswordReset.findOne({
            token: hashedToken,
            expiresAt: { $gt: Date.now() },
            used: false
        });

        if (!passwordReset) {
            return next(new ErrorHandler("Invalid or Expired reset token"))
        }

        res.status(200).json({
            success: true,
            message: 'Token is valid'
        });
})
