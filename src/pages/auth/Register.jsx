import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon, HomeIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Shield, Building, MapPin, GraduationCap, Award } from "lucide-react";

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
 add-password-strength-checker
add-password-strength-checker

 main
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    phone: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    pharmacyName: '',
    pharmacyAddress: ''
 add-password-strength-checker
  })
  const [passwordStrength, setPasswordStrength] = useState('');


    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    phone: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    pharmacyName: "",
    pharmacyAddress: "",

 main
  });
main

  const [passwordValidity, setPasswordValidity] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const checkPasswordStrength = (password) => {
    setPasswordValidity({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
add-password-strength-checker
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'password') {
      const strength = checkPasswordStrength(e.target.value);
      setPasswordStrength(strength);
    }
    if (error) setError('')
      
  }

      [e.target.name]: e.target.value,
    });
    if (error) setError("");
    if (e.target.name === 'password') {
      checkPasswordStrength(e.target.value);
    }
  };
main

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Phone number must be exactly 10 digits
    const cleanedPhone = formData.phone.replace(/\D/g, "");
    if (cleanedPhone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    // Check password requirements
    if (!Object.values(passwordValidity).every(Boolean)) {
      setError('Please meet all password requirements.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await register(formData);
      if (result.success) {
        navigate(`/${result.user.role}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 add-password-strength-checker
  const checkPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return 'Weak';
  if (score === 3) return 'Medium';
  return 'Strong';
};


  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
    }
add-password-strength-checker
  }
 main

  };
main

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      x: [0, 10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "doctor":
        return (
          <motion.div
            key="doctor-fields"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="space-y-4"
          >
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="specialization"
                type="text"
                required
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Specialization"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.03 }} className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="licenseNumber"
                type="text"
                required
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="Medical License Number"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.06 }} className="relative">
              <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
              />
            </motion.div>
          </motion.div>
        );

      case "pharmacist":
        return (
          <motion.div
            key="pharmacist-fields"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="space-y-4"
          >
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="licenseNumber"
                type="text"
                required
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="Pharmacy License Number"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.03 }} className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="pharmacyName"
                type="text"
                required
                value={formData.pharmacyName}
                onChange={handleChange}
                placeholder="Pharmacy Name"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
              />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.06 }} className="relative">
              <MapPin className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
              <textarea
                name="pharmacyAddress"
                required
                value={formData.pharmacyAddress}
                onChange={handleChange}
                rows={3}
                placeholder="Pharmacy Address"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400 resize-none"
              />
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background decorative elements */}
      <motion.div
        variants={pulseVariants}
        animate="animate"
        className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200/20 rounded-full blur-xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-200/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-lg"
      />
      <motion.div
        animate={{
          y: [0, 25, 0],
          x: [0, -10, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-br from-purple-300/20 to-blue-300/20 rounded-full blur-lg"
      />

      {/* Home Button */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 text-blue-600 hover:text-blue-700 hover:bg-white transition-all duration-300 group"
        >
          <motion.div
            whileHover={{ x: -3 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <HomeIcon className="w-5 h-5" />
          </motion.div>
          <span className="font-medium text-sm">Home</span>
        </Link>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg w-full space-y-6 bg-white/90 backdrop-blur-sm px-8 py-10 rounded-2xl shadow-2xl shadow-blue-200/20 border border-blue-100/50 relative z-10"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* HEADER */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-3"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
              CareSync
            </h1>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-900"
          >
            Create your account
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-600"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-500 hover:underline transition-all duration-200"
            >
              Sign in here
            </Link>
          </motion.p>
        </motion.div>

        {/* FORM */}
        <motion.form
          variants={containerVariants}
          className="mt-6 space-y-5"
          onSubmit={handleSubmit}
        >
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, height: 0 }}
                animate={{ opacity: 1, scale: 1, height: "auto" }}
                exit={{ opacity: 0, scale: 0.95, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="flex items-start">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0"
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="font-bold text-sm">Registration Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ROLE SELECT */}
          <motion.div variants={itemVariants} className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <motion.select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 bg-white appearance-none cursor-pointer"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacist">Pharmacist</option>
            </motion.select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <motion.svg
                animate={{ rotate: formData.role !== 'patient' ? 180 : 0 }}
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </motion.div>

          {/* NAME FIELDS */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
              />
            </motion.div>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
              />
            </motion.div>
          </motion.div>

          {/* CONTACT */}
          <motion.div variants={itemVariants} className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <motion.input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <motion.input
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* ROLE SPECIFIC */}
          <AnimatePresence mode="wait" initial={false}>
            {renderRoleSpecificFields()}
          </AnimatePresence>

          {/* PASSWORDS */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <motion.input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
 add-password-strength-checker
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              

                <AnimatePresence mode="wait">
                  {showPassword ? (
                    <motion.div
                      key="eyeslash"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EyeSlashIcon className="h-5 w-5 text-gray-500 hover:text-blue-600 transition-colors" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EyeIcon className="h-5 w-5 text-gray-500 hover:text-blue-600 transition-colors" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
 main
            </div>

            {/* Password strength indicator */}
            {formData.password.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2"
              >
                <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                <div className="space-y-1">
                  <p className={`flex items-center gap-2 text-sm ${passwordValidity.length ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidity.length ? '✓' : '✗'} At least 8 characters long
                  </p>
                  <p className={`flex items-center gap-2 text-sm ${passwordValidity.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidity.uppercase ? '✓' : '✗'} Contains at least one uppercase letter
                  </p>
                  <p className={`flex items-center gap-2 text-sm ${passwordValidity.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidity.lowercase ? '✓' : '✗'} Contains at least one lowercase letter
                  </p>
                  <p className={`flex items-center gap-2 text-sm ${passwordValidity.number ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidity.number ? '✓' : '✗'} Contains at least one number
                  </p>
                  <p className={`flex items-center gap-2 text-sm ${passwordValidity.special ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordValidity.special ? '✓' : '✗'} Contains at least one special character
                  </p>
                </div>
              </motion.div>
            )}

            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <motion.input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200/30 transition-all duration-300 placeholder-gray-400"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
 add-password-strength-checker
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {passwordStrength && (
                <p
                  className={`text-sm m-1 ${
                    passwordStrength === 'Weak'
                      ? 'text-red-500'
                      : passwordStrength === 'Medium'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                >
                  Strength: {passwordStrength}
                </p>
              )}
              

                <AnimatePresence mode="wait">
                  {showConfirmPassword ? (
                    <motion.div
                      key="eyeslash2"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EyeSlashIcon className="h-5 w-5 text-gray-500 hover:text-blue-600 transition-colors" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="eye2"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EyeIcon className="h-5 w-5 text-gray-500 hover:text-blue-600 transition-colors" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
 main
            </div>
          </motion.div>

          {/* TERMS */}
          <motion.div
            variants={itemVariants}
            className="flex items-start text-sm space-x-3 py-2"
          >
            <motion.input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            <label htmlFor="agree-terms" className="text-gray-700 leading-relaxed">
              I agree to the{" "}
              <motion.a
                href="#"
                className="text-blue-600 hover:text-blue-500 font-medium hover:underline transition-all duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Terms of Service
              </motion.a>{" "}
              and{" "}
              <motion.a
                href="#"
                className="text-blue-600 hover:text-blue-500 font-medium hover:underline transition-all duration-200"
                whileHover={{ scale: 1.05 }}
              >
                Privacy Policy
              </motion.a>
            </label>
          </motion.div>

          {/* SUBMIT */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !Object.values(passwordValidity).every(Boolean)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white py-3 px-6 rounded-xl text-lg font-bold shadow-lg shadow-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2"
                >
                  <LoadingSpinner size="sm" color="white" />
                  <span>Creating Account...</span>
                </motion.div>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2"
                >
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </motion.svg>
                  <span>Create Account</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* OR */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center my-6"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="flex-1 border-t border-gray-200"
            />
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.6 }}
              className="px-4 bg-white text-gray-500 text-sm font-medium"
            >
              Or continue with
            </motion.span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.5, duration: 0.5 }}
              className="flex-1 border-t border-gray-200"
            />
          </motion.div>

          {/* GOOGLE */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoogleSignup}
            className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300"
          >
            <motion.img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="h-5 w-5 mr-3"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            />
            <span>Sign up with Google</span>
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
