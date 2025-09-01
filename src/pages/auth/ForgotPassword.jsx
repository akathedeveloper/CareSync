// ForgotPassword.jsx

import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext'; // For resetPassword

import { Mail, Loader2, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

import toast from 'react-hot-toast';

import LoadingSkeleton from '../../components/LoadingSkeleton'; // <-- Added skeleton import

const ForgotPassword = () => {

  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {

    e.preventDefault();

        // ForgotPassword.jsx

import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext'; 

import { Mail, Loader2, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

import toast from 'react-hot-toast';

import LoadingSkeleton from '../../components/LoadingSkeleton';

const ForgotPassword = () => {

  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');

  const [error, setError] = useState('');

  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const containerVariants = {

    hidden: { opacity: 0, y: 50 },

    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },

  };

  const itemVariants = {

    hidden: { opacity: 0, y: 20 },

    visible: { opacity: 1, y: 0 },

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {

      toast.error("Please enter your email address.");

      setError("Email address is required.");

      return;

    }

    try {

      setError('');

      setMessage('');

      setLoading(true);

      await resetPassword(email); // actual API call

      setMessage('Success! Check your inbox for reset instructions.');

      toast.success('Password reset link sent successfully!');

    } catch (err) {

      setError('Failed to send reset email. Please check if the email is correct.');

      toast.error('Failed to send reset email.');

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background animations */}

      <motion.div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full animate-pulse" />

      <motion.div className="absolute bottom-32 right-10 w-24 h-24 bg-teal-200/20 dark:bg-teal-400/10 rounded-full"

        animate={{ y: [-10, 10, -10], x: [-5, 5, -5], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}

      />

      <motion.div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/50 dark:border-gray-700/50 relative z-10"

        variants={containerVariants} initial="hidden" animate="visible"

      >

        {/* Header */}

        <motion.div className="text-center" variants={itemVariants}>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Forgot Password?</h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">No worries, we'll send you reset instructions.</p>

        </motion.div>

        {/* Messages */}

        <AnimatePresence>

          {error && (

            <motion.div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center gap-3 border border-red-200 dark:border-red-800"

              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}

            >

              <AlertTriangle className="h-5 w-5 flex-shrink-0" /> <span>{error}</span>

            </motion.div>

          )}

          {message && !loading && (

            <motion.div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm flex items-center gap-3 border border-green-200 dark:border-green-800"

              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}

            >

              <CheckCircle className="h-5 w-5 flex-shrink-0" /> <span>{message}</span>

            </motion.div>

          )}

        </AnimatePresence>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6">

          <motion.div variants={itemVariants}>

            <label htmlFor="email" className="sr-only">Email Address</label>

            <div className="relative">

              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

              <input id="email" type="email" autoComplete="email" required

                value={email} onChange={(e) => setEmail(e.target.value)}

                className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"

                placeholder="Enter your email address"

              />

            </div>

          </motion.div>

          <motion.button type="submit" disabled={loading}

            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 hover:from-emerald-700 hover:to-teal-700 dark:hover:from-emerald-600 dark:hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 dark:focus:ring-offset-gray-800 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"

            whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}

            whileTap={{ scale: loading ? 1 : 0.98 }}

            variants={itemVariants}

          >

            <AnimatePresence mode="wait">

              {loading ? (

                <motion.div key="loading" className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                  <Loader2 className="h-5 w-5 animate-spin" /> <span className="ml-2">Sending...</span>

                </motion.div>

              ) : (

                <motion.span key="submit" className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                  Send Reset Link

                </motion.span>

              )}

            </AnimatePresence>

          </motion.button>

          {/* Loading Skeleton */}

          {loading && (

            <div className="mt-4">

              <LoadingSkeleton width="100%" height="20px" count={2} />

            </div>

          )}

        </form>

        <motion.div variants={itemVariants} className="text-center">

          <Link to="/login" className="font-medium text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors duration-200 inline-flex items-center gap-2">

            <ArrowLeft className="h-4 w-4" /> <span>Back to Sign In</span>

          </Link>

        </motion.div>

      </motion.div>

    </div>

  );

};

export default ForgotPassword;