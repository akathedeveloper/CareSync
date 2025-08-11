import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
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
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

 sign-up-with-google
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      const result = await loginWithGoogle()
      if (result.success) {
        navigate(`/${result.user.role}`)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fillDemoCredentials = (role) => {
    const credentials = {
      patient: { email: 'patient@caresync.com', password: 'password123' },
      doctor: { email: 'doctor@caresync.com', password: 'password123' },
      pharmacist: { email: 'pharmacist@caresync.com', password: 'password123' }
    }
    
  const fillDemoCredentials = (role) => {
    let user;
    if (role === 'patient') user = patients[0];
    if (role === 'doctor') user = doctors[0];
    if (role === 'pharmacist') user = pharmacists[0];
    
main
    setFormData({
      email: user.email,
      password: user.password,
      role: user.role
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-primary-600">CareSync</h1>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              create a new account
            </Link>
          </p>
        </div>

sign-up-with-google
        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</h3>
          <div className="space-y-1 text-xs text-blue-700">
            <button type="button" onClick={() => fillDemoCredentials('patient')} className="block hover:underline">
              👤 Patient: patient@caresync.com
            </button>
            <button type="button" onClick={() => fillDemoCredentials('doctor')} className="block hover:underline">
              👩‍⚕️ Doctor: doctor@caresync.com
            </button>
            <button type="button" onClick={() => fillDemoCredentials('pharmacist')} className="block hover:underline">
              💊 Pharmacist: pharmacist@caresync.com
        <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded-lg">
          <h3 className="text-sm font-bold mb-2">Demo Credentials:</h3>
          <div className="space-y-2 text-xs">
            <button 
              type="button"
              onClick={() => fillDemoCredentials('patient')}
              className="flex items-center gap-2 hover:text-blue-900 transition-colors"
            >
              <span role="img" aria-label="patient">👤</span> Patient: {patients[0].email}
            </button>
            <button 
              type="button"
              onClick={() => fillDemoCredentials('doctor')}
              className="flex items-center gap-2 hover:text-blue-900 transition-colors"
            >
              <span role="img" aria-label="doctor">👩‍⚕️</span> Doctor: {doctors[0].email}
            </button>
            <button 
              type="button"
              onClick={() => fillDemoCredentials('pharmacist')}
              className="flex items-center gap-2 hover:text-blue-900 transition-colors"
            >
              <span role="img" aria-label="pharmacist">💊</span> Pharmacist: {pharmacists[0].email main
            </button>
            <p className="text-blue-600 pt-2">Password: <strong>password123</strong></p>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
sign-up-with-google
          <div className="space-y-4">
            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative mb-4">
              <label htmlFor="role" className="sr-only">
                Role
              </label>
 main
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="pharmacist">Pharmacist</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
sign-up-with-google

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>

            
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
 main
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            {/* Password */}
            <div>
sign-up-with-google
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">

              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
main
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Sign in button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <LoadingSpinner size="sm" color="white" /> : 'Sign in'}
            </button>
          </div>

          {/* OR divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign-In button */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 bg-white text-sm font-medium rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
