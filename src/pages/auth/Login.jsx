import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

import LoadingSkeletons from '../components/LoadingSkeletons';

const Login = () => {

  const { login, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const containerVariants = {

    hidden: { opacity: 0, y: 50 },

    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },

  };

  const itemVariants = {

    hidden: { opacity: 0, y: 20 },

    visible: { opacity: 1, y: 0 },

  };

  const handleChange = (e) => {

    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setError('');

      setLoading(true);

      // Demo loading skeleton for 2 seconds

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Actual login API call

      await login(formData.email, formData.password);

      navigate('/');

    } catch (err) {

      setError('Failed to sign in: ' + err.message);

    } finally {

      setLoading(false);

    }

  };

  const handleGoogleLogin = async () => {

    setError('');

    setLoading(true);

    try {

      await loginWithGoogle();

      navigate('/');

    } catch (err) {

      setError('Failed to sign in with Google: ' + err.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    // ...rest of your JSX (form, buttons, skeletons)

  );

};

export default Login;


        <>

  <Navbar />

  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

    {/* Animated background */}

    <motion.div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full" variants={pulseVariants} animate="animate" />

    <motion.div className="absolute top-32 right-20 w-16 h-16 bg-teal-200/20 dark:bg-teal-400/10 rounded-full" variants={floatingVariants} animate="animate" style={{ animationDelay: '0.5s' }} />

    <motion.div className="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-200/20 dark:bg-cyan-400/10 rounded-full" variants={pulseVariants} animate="animate" style={{ animationDelay: '1s' }} />

    <motion.div className="absolute bottom-32 right-10 w-24 h-24 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full" variants={floatingVariants} animate="animate" style={{ animationDelay: '1.5s' }} />

    {/* Login Card */}

    <motion.div className="max-w-lg w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/50 dark:border-gray-700/50 relative z-10" variants={containerVariants} initial="hidden" animate="visible" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>

      

      {/* Header */}

      <motion.div className="text-center" variants={itemVariants}>

        <motion.div className="flex justify-center mb-6" whileHover={{ rotate: 360, scale: 1.05 }} transition={{ duration: 0.6 }}>

          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg flex items-center justify-center">

            <UserCheck className="w-8 h-8 text-white" />

          </div>

        </motion.div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome Back</h2>

        <p className="text-gray-600 dark:text-gray-400">Sign in to your account</p>

      </motion.div>

      {/* Error */}

      {error && (

        <motion.div className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-3 rounded-lg text-sm border border-red-200 dark:border-red-800" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>

          {error}

        </motion.div>

      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Email */}

        <motion.div className="space-y-2" variants={itemVariants}>

          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>

          <div className="relative">

            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700" placeholder="Enter your email address" aria-label="Email address" />

          </div>

        </motion.div>

        {/* Password */}

        <motion.div className="space-y-2" variants={itemVariants}>

          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>

          <div className="relative">

            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

            <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700" placeholder="Enter your password" aria-label="Password" />

            <motion.button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors duration-200" onClick={() => setShowPassword(!showPassword)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label={showPassword ? "Hide password" : "Show password"}>

              <AnimatePresence mode="wait">

                {showPassword ? (

                  <motion.div key="eyeoff" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>

                    <EyeOff className="h-5 w-5" />

                  </motion.div>

                ) : (

                  <motion.div key="eye" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>

                    <Eye className="h-5 w-5" />

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.button>

          </div>

        </motion.div>

        {/* Remember & Forgot */}

        <motion.div className="flex items-center justify-between" variants={itemVariants}>
</motion.div>

          {/* Sign In / Submit Button */}

          <motion.button

            type="submit"

            disabled={loading}

            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 hover:from-emerald-700 hover:to-teal-700 dark:hover:from-emerald-600 dark:hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 dark:focus:ring-offset-gray-800 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"

            whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}

            whileTap={{ scale: loading ? 1 : 0.98 }}

            variants={itemVariants}

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

                  key="submit"

                  initial={{ opacity: 0 }}

                  animate={{ opacity: 1 }}

                  exit={{ opacity: 0 }}

                  className="flex items-center"

                >

                  Sign In

                </motion.span>

              )}

            </AnimatePresence>

          </motion.button>
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

          {/* Google Login Button */}

          <motion.button

            type="button"

            onClick={handleGoogleLogin}

            disabled={loading}

            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-gray-700/50 hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 transition-all duration-200 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"

            variants={itemVariants}

          >

            <img

              className="h-5 w-5 mr-2"

              src="https://www.google.com/favicon.ico"

              alt="Google"

            />

            Continue with Google

          </motion.button>

          {/* Sign Up Link */}

          <motion.p 

            className="text-center text-sm text-gray-600 dark:text-gray-400"

            variants={itemVariants}

          >

            Don't have an account?{' '}

            <Link

              to="/register"

              className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors duration-200"

            >

              Sign up

            </Link>

          </motion.p>

        </form>

      </motion.div>

    </div>

    <Footer/>

    </>

  );

};

export default Login;