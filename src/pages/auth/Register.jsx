import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../../components/common/Navbar";

import Footer from '../Footer';

const Register = () => {

  const { signup } = useAuth();

  const navigate = useNavigate();

  

  const [formData, setFormData] = useState({

    email: '',

    password: '',

  });

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  // Animation variants

  const containerVariants = {

    hidden: { opacity: 0, y: 50 },

    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }

  };

  const itemVariants = {

    hidden: { opacity: 0, y: 20 },

    visible: { opacity: 1, y: 0 }

  };

  const handleChange = (e) => {

    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError('');

    setLoading(true);

    try {

      await signup(formData.email, formData.password);

      navigate('/dashboard');

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <>

    <Navbar />

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Animated background elements */}

      <motion.div

        className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full blur-xl"

        animate={{ scale: [1, 1.1, 1] }}

        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}

      />

      <motion.div

        className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full blur-xl"

        animate={{ scale: [1, 1.05, 1], y: [0, 10, 0] }}

        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}

      />

      {/* Email Input */}

        <motion.div className="space-y-2" variants={itemVariants}>

          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">

            Email Address

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

              placeholder="Enter your email"

              className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"

            />

          </div>

        </motion.div>

        {/* Password Input */}

        <motion.div className="space-y-2" variants={itemVariants}>

          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">

            Password

          </label>

          <div className="relative">

            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

            <input

              id="password"

              name="password"

              type={showPassword ? 'text' : 'password'}

              required

              value={formData.password}

              onChange={handleChange}

              placeholder="Enter your password"

              className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"

            />

            <button

              type="button"

              className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors duration-200"

              onClick={() => setShowPassword(!showPassword)}

            >

              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}

            </button>

          </div>

        </motion.div>

        {/* Submit Button */}

        <motion.button

          type="submit"

          disabled={loading}

          className={`group relative w-full flex justify-center py-3 px-4 text-sm font-semibold rounded-xl text-white ${

            loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"

          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 ease-in-out`}

          variants={itemVariants}

        >

          <AnimatePresence mode="wait">

            {loading ? (

              <div className="flex items-center">

                <LoadingSpinner className="h-5 w-5 mr-2" />

                Signing up...

              </div>

            ) : (

              <span>Sign Up</span>

            )}

          </AnimatePresence>

        </motion.button>
<>

  <Navbar/>

  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

    {/* Animated background elements */}

    <motion.div

      variants={pulseVariants}

      animate="animate"

      className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full blur-xl"

    />

    <motion.div

      variants={floatingVariants}

      animate="animate"

      className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full blur-xl"

    />

    <motion.div

      variants={containerVariants}

      initial="hidden"

      animate="visible"

      className="max-w-lg w-full space-y-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-8 py-10 rounded-2xl shadow-2xl shadow-emerald-200/20 dark:shadow-gray-900/50 border border-emerald-100/50 dark:border-gray-700/50 relative z-10"

      whileHover={{ y: -5 }}

      transition={{ type: "spring", stiffness: 300 }}

    >

      {/* HEADER */}

      <motion.div variants={itemVariants} className="text-center space-y-3">

        <div className="flex flex-col items-center justify-center">

          <motion.div

            whileHover={{ rotate: 360, scale: 1.05 }}

            transition={{ duration: 0.6 }}

            className="w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16"

          >

            <img

              src="/CareSync-Logo.png"

              alt="CareSync Logo"

              className="w-full h-full"

            />

          </motion.div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent mt-2">

            CareSync

          </h1>

        </div>

      </motion.div>

      {/* FORM */}

      <motion.form className="space-y-4">

        {/* ...all form fields with AnimatePresence + motion handling... */}

        {/* SUBMIT BUTTON */}

        <motion.button

          variants={itemVariants}

          whileHover={{ scale: 1.02, y: -2 }}

          whileTap={{ scale: 0.98 }}

          type="submit"

          disabled={

            loading || !Object.values(passwordValidity).every(Boolean)

          }

          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-6 rounded-xl text-lg font-bold shadow-lg shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"

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

                  <path

                    strokeLinecap="round"

                    strokeLinejoin="round"

                    strokeWidth={2}

                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"

                  />

                </motion.svg>

                <span>Create Account</span>

              </motion.span>

            )}

          </AnimatePresence>

        </motion.button>

        {/* GOOGLE SIGNUP */}

        <motion.button

          variants={itemVariants}

          whileHover={{ scale: 1.02, y: -1 }}

          whileTap={{ scale: 0.98 }}

          type="button"

          onClick={handleGoogleSignup}

          className="w-full inline-flex justify-center items-center py-3 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md transition-all duration-300"

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

  <Footer/>

</>

          

          
                
            
                        
                
              
