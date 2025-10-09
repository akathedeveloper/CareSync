import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/common/Navbar";
import Footer from "../Footer";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const result = await login(formData.email, formData.password, formData.role);
      if (result.success && result.user) {
        navigate(`/${result.user.role}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(t("login.error") + ": " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      navigate("/home");
    } catch (err) {
      setError(t("login.errorGoogle") + ": " + err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Orbs */}
        <motion.div
          className="absolute top-10 left-10 w-24 h-24 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full"
          variants={pulseVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-32 right-20 w-20 h-20 bg-teal-200/20 dark:bg-teal-400/10 rounded-full"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-cyan-200/20 dark:bg-cyan-400/10 rounded-full"
          variants={pulseVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          className="absolute bottom-32 right-10 w-28 h-28 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full"
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Login Card */}
        <motion.div
          className="max-w-lg w-full space-y-8 bg-white/80 dark:bg-gray-800/90 p-10 rounded-2xl shadow-2xl border border-white/50 dark:border-gray-700/50 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Header */}
          <motion.div className="text-center" variants={itemVariants}>
            <motion.div
              className="flex justify-center mb-6"
              whileHover={{ rotate: 360, scale: 1.05 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg flex items-center justify-center">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t("login.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("login.subtitle")}
            </p>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm border border-red-200 dark:border-red-800"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("login.role")}
              </label>
              <div className="relative">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all bg-white/70 dark:bg-gray-700/50"
                >
                  <option value="patient">{t("login.roles.patient")}</option>
                  <option value="doctor">{t("login.roles.doctor")}</option>
                  <option value="pharmacist">{t("login.roles.pharmacist")}</option>
                </select>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("login.email")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-all bg-white/70 dark:bg-gray-700/50"
                  placeholder={t("login.emailPlaceholder")}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t("login.password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-all bg-white/70 dark:bg-gray-700/50"
                  placeholder={t("login.passwordPlaceholder")}
                />
                <motion.button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500 dark:text-emerald-400"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {!showPassword ? (
                      <EyeOff className="h-5 w-5" key="eyeoff" />
                    ) : (
                      <Eye className="h-5 w-5" key="eye" />
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            {/* Remember & Forgot */}
            <motion.div
              className="flex items-center justify-between"
              variants={itemVariants}
            >
              <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400 focus:ring-emerald-500 border-gray-300 dark:border-gray-600 rounded"
                />
                {t("login.remember")}
              </label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {t("login.forgot")}
              </button>
            </motion.div>

            {/* Submit */}
           <motion.button
  type="submit"
  disabled={loading}
  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-base font-semibold rounded-2xl text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 shadow-xl transition-all duration-300"
  whileHover={{ scale: loading ? 1 : 1.03 }}
  whileTap={{ scale: loading ? 1 : 0.97 }}
  variants={itemVariants}
>
  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : t("login.submit")}
</motion.button>


            {/* Google */}
            <motion.button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white hover:bg-gray-50 dark:bg-gray-700/50 transition-all disabled:opacity-50"
              variants={itemVariants}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              {t("login.google")}
            </motion.button>

            {/* Sign Up */}
            <motion.p
              className="text-center text-sm text-gray-600 dark:text-gray-400"
              variants={itemVariants}
            >
              {t("login.noAccount")}{" "}
              <Link
                to="/register"
                className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {t("login.signup")}
              </Link>
            </motion.p>
          </form>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
