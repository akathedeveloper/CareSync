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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background decorative elements */}
      <motion.div 
        className="absolute top-10 left-10 w-20 h-20 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full"
        variants={pulseVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute top-32 right-20 w-16 h-16 bg-teal-200/20 dark:bg-teal-400/10 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '0.5s' }}
      />
      <motion.div 
        className="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-200/20 dark:bg-cyan-400/10 rounded-full"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />
      <motion.div 
        className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full"
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
          className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 dark:border-gray-700/50 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 group"
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
        className="max-w-lg w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/50 dark:border-gray-700/50 relative z-10"
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
            className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            CareSync
          </motion.h1>
          <motion.h2 
            className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Welcome Back
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-300 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Sign in to continue your healthcare journey
          </motion.p>
          <motion.p 
            className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-emerald-500 dark:hover:decoration-emerald-300"
            >
              Create one here
            </Link>
          </motion.p>
        </motion.div>

        {/* Demo Credentials Section */}
        <motion.div 
          className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-l-4 border-emerald-400 dark:border-emerald-500 p-5 rounded-xl shadow-sm"
          variants={itemVariants}
        >
          <motion.div 
            className="flex items-center mb-3"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-6 h-6 bg-emerald-500 dark:bg-emerald-600 rounded-full flex items-center justify-center mr-2">
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
            </div>
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">Quick Demo Access</h3>
          </motion.div>
          <div className="space-y-3 text-xs">
            {['patient', 'doctor', 'pharmacist'].map((role, index) => {
              const user = role === 'patient' ? patients[0] : role === 'doctor' ? doctors[0] : pharmacists[0];
              const colors = {
                patient: 'from-blue-400 to-blue-500',
                doctor: 'from-green-400 to-green-500',
                pharmacist: 'from-purple-400 to-purple-500'
              };
              const icons = {
                patient: '👤',
                doctor: '👩‍⚕️',
                pharmacist: '💊'
              };
              const labels = {
                patient: 'Patient Portal',
                doctor: 'Doctor Dashboard',
                pharmacist: 'Pharmacy System'
              };

              return (
                <motion.button
                  key={role}
                  type="button"
                  onClick={() => fillDemoCredentials(role)}
                  className="w-full flex items-center gap-3 p-3 bg-white/70 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md rounded-lg transition-all duration-200 text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 border border-emerald-100 dark:border-emerald-800"
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
                    <div className="text-emerald-600 dark:text-emerald-400 text-xs">{user?.email || 'No email'}</div>
                  </div>
                </motion.button>
              );
            })}
            <motion.div 
              className="bg-emerald-100 dark:bg-emerald-800/30 rounded-lg p-3 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <p className="text-emerald-700 dark:text-emerald-300 text-center">
                <span className="font-medium">Default Password:</span> 
                <motion.code 
                  className="bg-emerald-200 dark:bg-emerald-700 px-2 py-1 rounded font-mono text-xs ml-1"
                  whileHover={{ scale: 1.05 }}
                >
                  password123
                </motion.code>
              </p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Login Form */}
        <motion.form className="space-y-6" onSubmit={handleSubmit} variants={itemVariants}>
          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 border-l-4 border-red-500 dark:border-red-400 p-4 rounded-xl shadow-sm"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center">
                  <motion.div 
                    className="w-6 h-6 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center mr-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                  <div>
                    <p className="font-bold text-red-800 dark:text-red-200">Authentication Error</p>
                    <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
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
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Role
              </label>
              <div className="relative">
                <motion.select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"
                  whileFocus={{ scale: 1.02 }}
                  aria-label="Select your role"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="pharmacist">Pharmacist</option>
                </motion.select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-emerald-500 dark:text-emerald-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <motion.input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <motion.input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"
                  placeholder="Enter your password"
                  whileFocus={{ scale: 1.02 }}
                  aria-label="Password"
                />
                <motion.button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors duration-200"
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
                className="h-4 w-4 text-emerald-600 dark:text-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400 border-gray-300 dark:border-gray-600 rounded transition-colors duration-200 bg-white dark:bg-gray-700"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                Keep me signed in
              </label>
            </div>

            <div className="text-sm">
              <button 
                type="button"
                className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                onClick={() => {/* Add forgot password logic */}}
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
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 hover:from-emerald-700 hover:to-teal-700 dark:hover:from-emerald-600 dark:hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 dark:focus:ring-offset-gray-800 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
                    </motion.svg>
                    Sign In to CareSync
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

             {/* Google Sign In Button - Uncomment if needed */}

 {/*

 <motion.button

 type="button"

 onClick={handleGoogleSignIn}

 disabled={loading}

 className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"

 whileHover={{ scale: loading ? 1 : 1.02 }}

 whileTap={{ scale: loading ? 1 : 0.98 }}

 >

 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">

 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>

 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>

 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>

 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>

 </svg>

 Continue with Google

 </motion.button>

 */}

</motion.div>

</motion.form>

</motion.div>

</div>

 )

}

export default Login