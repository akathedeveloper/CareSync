const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Import your Mongoose models
const User = require('../db/models/User');
const PasswordReset = require('../db/models/PasswordReset');

// Configure nodemailer for sending emails.
// IMPORTANT: You must update these settings with your own email provider's credentials.
const transporter = nodemailer.createTransport({
    service: 'gmail', // Example: 'gmail', 'smtp.mailtrap.io' etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address from .env file
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    }
});

/**
 * @desc    Handles a password reset request.
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Basic validation for the presence and format of the email.
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
        }

        // Find the user by email.
        const user = await User.findOne({ email });

        // Security best practice: Always send a success message to prevent
        // email enumeration, regardless of whether the user exists.
        if (!user) {
            return res.status(200).json({ success: true, message: 'If an account with that email exists, a password reset link has been sent.' });
        }

        // Delete any existing password reset tokens for this user to ensure only
        // the most recent one is valid.
        await PasswordReset.deleteMany({ userId: user._id });

        // Generate a cryptographically secure random token for the reset link.
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash the token before storing it in the database for security.
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Set the token to expire in 1 hour.
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

        // Create and save the new password reset record.
        await PasswordReset.create({ userId: user._id, token: hashedToken, expiresAt });

        // Construct the password reset URL for the user to click.
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        // Create the HTML content for the email.
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please click on the following link to reset your password:</p>
            <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
            <p>If you did not request this, please ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
        `;

        try {
            // Send the email to the user.
            await transporter.sendMail({
                to: user.email,
                subject: 'CareSync Password Reset Request',
                html: message,
            });
            res.status(200).json({ success: true, message: 'If an account with that email exists, a password reset link has been sent.' });
        } catch (emailError) {
            // Handle and log email sending errors gracefully.
            console.error('Email send error:', emailError);
            res.status(500).json({ success: false, message: 'Email could not be sent.' });
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

/**
 * @desc    Resets the user's password.
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Validate that a new password was provided.
        if (!password) {
            return res.status(400).json({ success: false, message: 'Please provide a new password.' });
        }

        // Enforce a minimum password length for security.
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long.' });
        }

        // Hash the provided URL token to find it in the database.
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find a valid, unused, and unexpired password reset token.
        const passwordReset = await PasswordReset.findOne({
            token: hashedToken,
            expiresAt: { $gt: Date.now() },
            used: false,
        });

        if (!passwordReset) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
        }

        // Find the user associated with the token.
        const user = await User.findById(passwordReset.userId);
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found.' });
        }

        // Hash the new password before saving it to the database.
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        // Mark the token as used to prevent it from being used again.
        passwordReset.used = true;
        await passwordReset.save();

        // For extra security, delete all of the user's password reset tokens.
        await PasswordReset.deleteMany({ userId: user._id });

        res.status(200).json({ success: true, message: 'Password reset successful.' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

/**
 * @desc    Verifies if a password reset token is valid.
 * @route   GET /api/auth/verify-reset-token/:token
 * @access  Public
 */
exports.verifyResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        // Hash the token to find it in the database.
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find the token and check if it's not expired and hasn't been used.
        const passwordReset = await PasswordReset.findOne({
            token: hashedToken,
            expiresAt: { $gt: Date.now() },
            used: false,
        });

        if (!passwordReset) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
        }

        res.status(200).json({ success: true, message: 'Token is valid.' });
    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};
