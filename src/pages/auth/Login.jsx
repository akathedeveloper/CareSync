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
    let user
    if (role === 'patient') user = patients[0]
    if (role === 'doctor') user = doctors[0]
    if (role === 'pharmacist') user = pharmacists[0]

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
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-700 p-4 rounded-lg">
          <h3 className="text-sm font-bold mb-2">Demo Credentials:</h3>
          <div className="space-y-2 text-xs">
            <button type="button" onClick={() => fillDemoCredentials('patient')} className="flex items-center gap-2 hover:text-blue-900 transition-colors">
              👤 Patient: {patients[0].email}
            </button>
            <button type="button" onClick={() => fillDemoCredentials('doctor')} className="flex items-center gap-2 hover:text-blue-900 transition-colors">
              👩‍⚕️ Doctor: {doctors[0].email}
            </button>
            <button type="button" onClick={() => fillDemoCredentials('pharmacist')} className="flex items-center gap-2 hover:text-blue-900 transition-colors">
              💊 Pharmacist: {pharmacists[0].email}
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

          {/* Role */}
          <div>
            <label htmlFor="role" className="sr-only">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="appearance-none block w-full px-3 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="pharmacist">Pharmacist</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="appearance-none block w-full px-3 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="appearance-none block w-full px-3 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
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

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">Forgot your password?</a>
            </div>
          </div>

          {/* Sign in button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
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

          {/* Google Sign-In */}
          <div>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 bg-white text-sm font-medium rounded-md shadow-sm hover:bg-gray-50"
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
