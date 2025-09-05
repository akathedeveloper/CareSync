const express= require("express")

const { register, login, me } = require("../controllers/authController");
const { forgotPassword, resetPassword, verifyResetToken } = require("../controllers/passwordResetController");
const auth = require("../middleware/auth");
const { validateAuth } = require("../middleware/validation");

const router = express.Router();

router.post("/register", validateAuth.register, register);
router.post("/login", validateAuth.login, login);
router.get("/me", auth, me);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/verify-reset-token/:token", verifyResetToken);

module.exports = router;
