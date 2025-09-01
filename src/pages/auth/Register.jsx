import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Loader2 } from 'lucide-react';

const Register = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading
    
    try {
      await signup(email, password);
      setLoading(false); // Stop loading after success
      navigate('/dashboard'); // Ya jaha bhi redirect karna ho
    } catch (err) {
      setError(err.message);
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border p-2 rounded">
          <Mail className="mr-2" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 outline-none"
          />
        </div>

        <div className="flex items-center border p-2 rounded">
          <Lock className="mr-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="flex-1 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Loading...
            </div>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

export default Register;
