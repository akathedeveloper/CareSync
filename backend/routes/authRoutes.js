import express from 'express'
import { login, me, register } from '../controllers/authController';
import { forgotPassword, resetPassword, verifyResetToken } from '../controllers/passwordResetController';
import { isAuthenticated } from '../middleware/auth';
// const auth = require("../middleware/auth");
// const { validateAuth } = require("../middleware/validation");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/me").get( isAuthenticated, me);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/verify-reset-token/:token").get(verifyResetToken);

export default router
