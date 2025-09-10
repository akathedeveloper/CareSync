import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Mail, 
  Lock, 
  Loader2, 
  Eye, 
  EyeOff, 
  Home,
  UserCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/common/Navbar';
import Footer from '../Footer';

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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

    className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/50 text-emerald-600 hover:text-emerald-700 hover:bg-white transition-all duration-300 group"

    aria-label="Go to homepage"

    tabIndex={0} // ✅ keyboard focus

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

{/* Error Message */}

{error && (

  <motion.div 

    className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 p-3 rounded-lg text-sm border border-red-200 dark:border-red-800"

    initial={{ opacity: 0, y: -10 }}

    animate={{ opacity: 1, y: 0 }}

  >

    Sign in to continue your healthcare journey

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

        tabIndex={0} // ✅ keyboard focus

        aria-label="Go to register page"

      >

        Create one here

      </Link>

    </motion.p>

  </motion.div>

)}
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Role
            </label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"
                aria-label="Select your role"
              >

                {/* Role Selection */}

<motion.div className="space-y-2" variants={itemVariants}>

  <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">

    Select Role

  </label>

  <div className="relative">

    <select

      id="role"

      name="role"

      required

      value={formData.role}

      onChange={handleChange}

      className="block w-full pl-3 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"

      aria-label="Select your role"

    >

      <option value="">Choose a role</option>

      <option value="patient">Patient</option>

      <option value="doctor">Doctor</option>

      <option value="pharmacist">Pharmacist</option>

    </select>

    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-emerald-500 dark:text-emerald-400">

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

      placeholder="Enter your email address"

      aria-label="Email address"

      className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all duration-200"

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

      type={showPassword ? "text" : "password"}

      required

      value={formData.password}

      onChange={handleChange}

      placeholder="Enter your password"

      aria-label="Password"

      className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"

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

            key="eyeoff"

            initial={{ opacity: 0, rotate: -90 }}

            animate={{ opacity: 1, rotate: 0 }}

            exit={{ opacity: 0, rotate: 90 }}

            transition={{ duration: 0.2 }}

          >

            <EyeOff className="h-5 w-5" />

          </motion.div>

        ) : (

          <motion.div

            key="eye"

            initial={{ opacity: 0, rotate: -90 }}

            animate={{ opacity: 1, rotate: 0 }}

            exit={{ opacity: 0, rotate: 90 }}

            transition={{ duration: 0.2 }}

          >

            <Eye className="h-5 w-5" />

          </motion.div>

        )}

      </AnimatePresence>

    </motion.button>

  </div>

</motion.div>
