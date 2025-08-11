import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
 sign-up-with-google
import { useAuth } from '../../contexts/AuthContext' // Adjust path as needed
=======
import { useAuth } from '../../contexts/AuthContext'
import LoadingSpinner from '../../components/common/LoadingSpinner'
 main

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    phone: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    pharmacyName: '',
    pharmacyAddress: ''
  })

  const { loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!')
      return
    }
 sign-up-with-google
    
    // TODO: Implement Firebase email/password registration here
    console.log('Registration attempt:', formData)

    setLoading(true)
    setError('')

    try {
      const result = await register(formData)
      if (result.success) {
        navigate(`/${result.user.role}`)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
 main
  }

  // Google Sign Up / Sign In handler
  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle()
      navigate('/dashboard') // Redirect after Google login/signup success
    } catch (error) {
      alert('Google sign-in failed: ' + error.message)
    }
  }

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case 'doctor':
        return (
          <>
            <input name="specialization" type="text" required value={formData.specialization} onChange={handleChange} placeholder="Specialization" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
            <input name="licenseNumber" type="text" required value={formData.licenseNumber} onChange={handleChange} placeholder="Medical License Number" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
            <input name="experience" type="number" value={formData.experience} onChange={handleChange} placeholder="Years of Experience" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
          </>
        )
      case 'pharmacist':
        return (
          <>
            <input name="licenseNumber" type="text" required value={formData.licenseNumber} onChange={handleChange} placeholder="Pharmacy License Number" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
            <input name="pharmacyName" type="text" required value={formData.pharmacyName} onChange={handleChange} placeholder="Pharmacy Name" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
            <textarea name="pharmacyAddress" required value={formData.pharmacyAddress} onChange={handleChange} rows={3} placeholder="Pharmacy Address" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-primary-600">CareSync</h1>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in here
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative mb-4">
              <select id="role" name="role" value={formData.role} onChange={handleChange} className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm">
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="pharmacist">Pharmacist</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <input name="firstName" type="text" required value={formData.firstName} onChange={handleChange} placeholder="First Name" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
              <input name="lastName" type="text" required value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
            </div>
            <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Email Address" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
            <input name="phone" type="tel" required value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
            {renderRoleSpecificFields()}
            <div className="relative">
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} placeholder="Password" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
            <div className="relative">
              <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" />
              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input id="agree-terms" name="agree-terms" type="checkbox" required className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>
            </label>
          </div>

          <div>
            <button type="submit" disabled={loading} className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? <LoadingSpinner size="sm" color="white" /> : 'Create Account'}
            </button>
          </div>
 sign-up-with-google

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Sign up with Google</span>
              </button>
            </div>
          </div>

 main
        </form>
      </div>
    </div>
  )
}

export default Register
