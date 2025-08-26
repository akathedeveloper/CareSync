import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Mail, Lock, Loader2 } from 'lucide-react'

const Login = () => {
  const { login, loginWithGoogle } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setLoading(true)
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError('Failed to sign in: ' + err.message)
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    try {
      setError('')
      setLoading(true)
      await loginWithGoogle()
      navigate('/')
    } catch (err) {
      setError('Failed to sign in with Google: ' + err.message)
    }
    setLoading(false)
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

        />

      </motion.div>

      <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>

      <p className="text-gray-600">Sign in to your account</p>

    </motion.div>

    {error && (

      <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">

        {error}

      </div>

    )}

    <form onSubmit={handleSubmit} className="space-y-4">

      <div>

        <label

          htmlFor="email"

          className="block text-sm font-medium text-gray-700"

        >

          Email address

        </label>

        <div className="mt-1 relative">

          <input

            id="email"

            type="email"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

            required

            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"

            placeholder="Enter your email"

          />

        </div>

      </div>

      {/* Password input and submit button can be added here */}

    </form>

  </motion.div>

</div>

            
                    {/* Role Selection, Email, and Password Inputs */}

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
<div className="flex items-center justify-between">

  <div className="flex items-center">

    <input

      id="remember"

      type="checkbox"

      className="h-4 w-4 text-emerald-600 dark:text-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400 border-gray-300 dark:border-gray-600 rounded transition-colors duration-200 bg-white dark:bg-gray-700"

    />

    <label

      htmlFor="remember"

      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"

    >

      Remember me

    </label>

  </div>

  {/* Forgot Password Button */}

  <div className="text-sm">

    <button 

      type="button"

      onClick={() => navigate('/forgot-password')}

      className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors duration-200 bg-transparent border-none cursor-pointer"

    >

      Forgot password?

    </button>

  </div>

</div>

<button

  type="submit"

  disabled={loading}

  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"

>

  Sign In

</button>

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

        <Loader2 className="h-5 w-5 animate-spin" />

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

        Sign in

      </motion.span>

    )}

  </AnimatePresence>

</motion.button>

{/* Optional Google Login Button */}

<button

  onClick={handleGoogleLogin}

  disabled={loading}

  className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"

>

  <img

    className="h-5 w-5 mr-2"

    src="https://www.google.com/favicon.ico"

    alt="Google"

  />

  Continue with Google

</button>

<p className="text-center text-sm text-gray-600">

  Don't have an account?{' '}

  <Link

    to="/register"

    className="font-medium text-emerald-600 hover:text-emerald-500"

  >

    Sign up

  </Link>

</p>