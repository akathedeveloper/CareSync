import React, { useState, useContext, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Mail, Loader2, ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

// Placeholder Firebase and Auth Context setup for a single-file demo
// In a real project, these would be separate files.
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        await signInAnonymously(auth);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const value = { user, resetPassword, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

// Placeholder components to make the file runnable
const Navbar = () => (
  <nav className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm shadow-md py-4 px-8 fixed w-full z-50">
    <div className="flex items-center justify-between max-w-7xl mx-auto">
      <Link to="/" className="text-xl font-bold text-emerald-600 dark:text-emerald-400">CareSync</Link>
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400">Login</Link>
        <Link to="/register" className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">Register</Link>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gray-100 dark:bg-gray-900 text-center py-6">
    <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 CareSync. All rights reserved.</p>
  </footer>
);

const DummyPage = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center">
    <h1 className="text-4xl font-bold">{title}</h1>
    <Link to="/forgot-password">Go to Forgot Password</Link>
  </div>
);

// The main component with the corrected logic
const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Animation variants from your Login/Register pages for consistency
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1, }, },
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
      await resetPassword(email);
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
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Reusing the animated background from your other pages */}
        <motion.div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200/20 dark:bg-emerald-400/10 rounded-full animate-pulse" />
        <motion.div className="absolute bottom-32 right-10 w-24 h-24 bg-teal-200/20 dark:bg-teal-400/10 rounded-full" animate={{ y: [-10, 10, -10], x: [-5, 5, -5], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } }} />
        <motion.div className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-white/50 dark:border-gray-700/50 relative z-10" variants={containerVariants} initial="hidden" animate="visible" >
          {/* Header Section */}
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Forgot Password?
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              No worries, we'll send you reset instructions.
            </p>
          </motion.div>
          {/* User Feedback Messages */}
          <AnimatePresence>
            {error && (
              <motion.div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center gap-3 border border-red-200 dark:border-red-800" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} >
                <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
            {message && (
              <motion.div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm flex items-center gap-3 border border-green-200 dark:border-green-800" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} >
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                <span>{message}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200 bg-white/70 dark:bg-gray-700/50 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700"
                  placeholder="Enter your email address"
                />
              </div>
            </motion.div>
            {/* Submit Button */}
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
                  <motion.div key="loading" className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="ml-2">Sending...</span>
                  </motion.div>
                ) : (
                  <motion.span key="submit" className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
                    Send Reset Link
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
          <motion.div variants={itemVariants} className="text-center">
            <Link to="/login" className="font-medium text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors duration-200 inline-flex items-center gap-2" >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Sign In</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <Footer />
      <Toaster position="bottom-right" />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ForgotPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<DummyPage title="Login Page" />} />
          <Route path="/register" element={<DummyPage title="Register Page" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
