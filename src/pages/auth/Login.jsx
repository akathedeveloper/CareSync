import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, HomeIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { patients, doctors, pharmacists } from "../../data/dummyData";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(
        formData.email,
        formData.password,
        formData.role
      );
      if (result.success) {
        // Show success toast
        toast.success(
          `Welcome back, ${result.user.name || result.user.email
          }! Redirecting to your dashboard...`,
          {
            duration: 3000,
            icon: "🎉",
          }
        );

        // Navigate after a short delay
        setTimeout(() => {
          navigate(`/${result.user.role}`);
        }, 1500);
      }
    } catch (err) {
      const errorMessage = err.message || "An error occurred during login";
      setError(errorMessage);
      // Show error toast
      toast.error(errorMessage, {
        duration: 4000,
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    let user;
    if (role === "patient") user = patients[0];
    if (role === "doctor") user = doctors;
    if (role === "pharmacist") user = pharmacists;

    if (user) {
      setFormData({
        email: user.email,
        password: user.password,
        role: user.role,
      });

      // Show toast notification for demo credentials
      toast.success(`Demo credentials loaded for ${role}!`, {
        duration: 2000,
        icon: "👤",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"></div>
      {/* bg-gray-900 relative overflow-hidden flex items-center justify-center bg-gray-800 dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"> */}
      {/* Animated background decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20"
        variants={pulseVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-32 right-20 w-16 h-16 bg-teal-200 rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "0.5s" }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-200 rounded-full opacity-20"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: "1s" }}
      />
      <motion.div
        className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-200 rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Home Button */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-gray-900/70 backdrop-blur-sm backdrop-blur-sm rounded-xl shadow-lg border border-white/50 dark:border-gray-700/50 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-800/80 backdrop-blur-xl dark:bg-gray-800/80 dark:hover:bg-gray-800 transition-all duration-300 group"
        >
          <motion.div
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <HomeIcon className="w-5 h-5" />
          </motion.div>
          <span className="font-medium text-sm">Home</span>
        </Link>
      </motion.div>

      <motion.div
        className="max-w-lg w-full space-y-6 bg-gray-800/80 backdrop-blur-xl ring-1 ring-white/10 px-8 py-10 rounded-2xl shadow-2xl shadow-blue-200/20 dark:shadow-gray-900/50 border border-gray-700/50 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Header Section */}
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <motion.svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </motion.svg>
            </div>
          </motion.div>
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            CareSync
          </motion.h1>
          <motion.h2
            className="text-2xl font-bold text-White-800 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome Back
          </motion.h2>
          <motion.p
            className="text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Sign in to continue your healthcare journey
          </motion.p>
          <motion.p
            className="mt-2 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-emerald-500"
            >
              Create one here
            </Link>
          </motion.p>
        </motion.div>

        {/* Demo Credentials Section */}
        <motion.div
          className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 p-5 rounded-xl shadow-sm"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center mb-3"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mr-2">
              <motion.svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </div>
            <h3 className="text-sm font-bold text-emerald-800">
              Quick Demo Access
            </h3>
          </motion.div>
          <div className="space-y-3 text-xs">
            {["patient", "doctor", "pharmacist"].map((role, index) => {
              const user =
                role === "patient"
                  ? patients[0]
                  : role === "doctor"
                    ? doctors
                    : pharmacists[0];
              const colors = {
                patient: "from-blue-400 to-blue-500",
                doctor: "from-green-400 to-green-500",
                pharmacist: "from-purple-400 to-purple-500",
              };
              const icons = {
                patient: "👤",
                doctor: "👩‍⚕️",
                pharmacist: "💊",
              };
              const labels = {
                patient: "Patient Portal",
                doctor: "Doctor Dashboard",
                pharmacist: "Pharmacy System",
              };

              return (
                <motion.button
                  key={role}
                  type="button"
                  onClick={() => fillDemoCredentials(role)}
                  className="w-full flex items-center gap-3 p-3 bg-gray-800/80 backdrop-blur-xl dark:bg-gray-800/80/70 hover:bg-gray-800/80 backdrop-blur-xl dark:bg-gray-800/80 hover:shadow-md rounded-xl transition-all duration-200 text-emerald-700 hover:text-emerald-800 border border-emerald-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className={`w-8 h-8 bg-gradient-to-br ${colors[role]} rounded-full flex items-center justify-center text-white text-sm`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {icons[role]}
                  </motion.div>
                  <div className="text-left flex-1">
                    <div className="font-medium">{labels[role]}</div>
                    <div className="text-emerald-600 text-xs">
                      {user?.email || "No email"}
                    </div>
                  </div>
                </motion.button>
              );
            })}
            <motion.div
              className="bg-emerald-100 rounded-xl p-3 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <p className="text-emerald-700 text-center">
                <span className="font-medium">Default Password:</span>
                <motion.code
                  className="bg-emerald-200 px-2 py-1 rounded font-mono text-xs ml-1"
                  whileHover={{ scale: 1.05 }}
                >
                  password123
                </motion.code>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Login Form */}
        <motion.form
          className="space-y-6"
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-4 rounded-xl shadow-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center">
                  <motion.div
                    className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="font-bold text-red-800">
                      Authentication Error
                    </p>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div className="space-y-5" variants={itemVariants}>
            {/* Role Selection */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Select Role
              </label>
              <div className="relative">
                <motion.select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 transition-colors duration-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-800/80 backdrop-blur-xl dark:bg-gray-800/80/70 backdrop-blur-sm hover:bg-gray-800/80 backdrop-blur-xl dark:bg-gray-800/80"
                  whileFocus={{ scale: 1.02 }}
                  aria-label="Select your role"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="pharmacist">Pharmacist</option>
                </motion.select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-emerald-500">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <motion.input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 transition-colors duration-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-800/80 backdrop-blur-xl dark:bg-gray-800/80/70 backdrop-blur-sm hover:bg-gray-800/80 backdrop-blur-xl dark:bg-gray-800/80"
                placeholder="Enter your email address"
                whileFocus={{ scale: 1.02 }}
                aria-label="Email address"
              />
            </motion.div>

            {/* Password Input */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <motion.input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 pr-12 border border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 transition-colors duration-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 bg-gray-800/80 backdrop-blur-xl dark:bg-gray-800/80/70 backdrop-blur-sm hover:bg-gray-800/80 backdrop-blur-xl dark:bg-gray-800/80"
                  placeholder="Enter your password"
                  whileFocus={{ scale: 1.02 }}
                  aria-label="Password"
                />
                <motion.button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500 hover:text-emerald-600 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <AnimatePresence mode="wait">
                    {showPassword ? (
                      <motion.div
                        key="eyeslash"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <EyeSlashIcon className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="eye"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <EyeIcon className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Remember me and Forgot password */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 transition-colors duration-300 rounded transition-colors duration-200"
              />
              <label
                htmlFor="remember-me"
                className="ml-3 block text-sm text-gray-700"
              >
                Keep me signed in
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                onClick={() => {
                  /* Add forgot password logic */
                }}
              >
                Forgot password?
              </button>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
          >
            <motion.button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="loading"
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <LoadingSpinner size="sm" color="white" />
                    <span className="ml-2">Signing in...</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="signin"
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"
                      />
                    </motion.svg>
                    Sign In to CareSync
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
