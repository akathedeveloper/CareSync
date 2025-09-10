import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon, HomeIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { patients, doctors, pharmacists } from '../../data/dummyData'

const Login = () => {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient'
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await login(formData.email, formData.password, formData.role)
      if (result.success) {
        navigate(`/${result.user.role}`)
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError('')
      const result = await loginWithGoogle()
      if (result.success) {
        navigate(`/${result.user.role}`)
      }
    } catch (err) {
      setError(err.message || 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = (role) => {
    let user
    if (role === 'patient') user = patients[0]
    if (role === 'doctor') user = doctors[0]
    if (role === 'pharmacist') user = pharmacists[0]

    if (user) {
      setFormData({
        email: user.email,
        password: user.password,
        role: user.role
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
        style={{ animationDelay: '0.5s' }}
      />
      <motion.div 
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-200 rounded-full opacity-20"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />
      <motion.div 
        className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-200 rounded-full opacity-20"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1.5s' }}
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
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 text-emerald-600 hover:text-emerald-700 hover:bg-white transition-all duration-300 group"
          aria-label="Go to homepage"
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
        className="max-w-lg w-full space-y-8 bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/50 relative z-10"
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
            whileHover={{ rotate: 360, scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 rounded-2xl shadow-lg"
            >
              <img
                src="/CareSync-Logo.png"
                alt="CareSync Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>
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
            className="text-2xl font-bold text-gray-800 mb-3"
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
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-emerald-500"
              tabIndex="0"
              aria-label="Go to register page"
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
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </motion.svg>