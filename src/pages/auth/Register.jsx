import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Register = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
add-password-strength-checker
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
  const [passwordStrength, setPasswordStrength] = useState('');


    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    phone: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    pharmacyName: "",
    pharmacyAddress: "",
  });
main

  const handleChange = (e) => {
    setFormData({
      ...formData,
add-password-strength-checker
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'password') {
      const strength = checkPasswordStrength(e.target.value);
      setPasswordStrength(strength);
    }
    if (error) setError('')
      
  }

      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };
main

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Phone number must be exactly 10 digits
    const cleanedPhone = formData.phone.replace(/\D/g, "");
    if (cleanedPhone.length !== 10) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    
    // Password length check
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Password must have uppercase, lowercase, number, and special char
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    let hasSpecial = false;
    const specials = "!@#$%^&*()_+[]{}|;:',.<>?/`~";

    for (let char of formData.password) {
      if (char >= "A" && char <= "Z") hasUppercase = true;
      else if (char >= "a" && char <= "z") hasLowercase = true;
      else if (char >= "0" && char <= "9") hasNumber = true;
      else if (specials.includes(char)) hasSpecial = true;
    }

    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
      setError(
        "Password must contain uppercase, lowercase, number, and special character."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await register(formData);
      if (result.success) {
        navigate(`/${result.user.role}`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 add-password-strength-checker
  const checkPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return 'Weak';
  if (score === 3) return 'Medium';
  return 'Strong';
};


  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
    }
add-password-strength-checker
  }
 main

  };
main

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "doctor":
        return (
          <>
            <input
              name="specialization"
              type="text"
              required
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Specialization"
              className="input-field"
            />
            <input
              name="licenseNumber"
              type="text"
              required
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Medical License Number"
              className="input-field"
            />
            <input
              name="experience"
              type="number"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Years of Experience"
              className="input-field"
            />
          </>
        );
      case "pharmacist":
        return (
          <>
            <input
              name="licenseNumber"
              type="text"
              required
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Pharmacy License Number"
              className="input-field"
            />
            <input
              name="pharmacyName"
              type="text"
              required
              value={formData.pharmacyName}
              onChange={handleChange}
              placeholder="Pharmacy Name"
              className="input-field"
            />
            <textarea
              name="pharmacyAddress"
              required
              value={formData.pharmacyAddress}
              onChange={handleChange}
              rows={3}
              placeholder="Pharmacy Address"
              className="input-field"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 bg-white px-10 py-8 rounded-xl shadow-2xl">
        {/* HEADER */}
        <div className="text-center space-y-2">
          {" "}
          <h1 className="text-4xl font-extrabold text-primary-600">CareSync</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* FORM */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-lg">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* ROLE SELECT */}
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field pr-10"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="pharmacist">Pharmacist</option>
          </select>

          {/* NAME FIELDS */}
          <div className="grid grid-cols-2 gap-3">
            {" "}
            <input
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="input-field"
            />
            <input
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="input-field"
            />
          </div>

          {/* CONTACT */}
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="input-field"
          />
          <input
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input-field"
          />

          {/* ROLE SPECIFIC */}
          {renderRoleSpecificFields()}

          {/* PASSWORDS */}
          <div className="space-y-5">
            {" "}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input-field"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
            </div>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="input-field"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {passwordStrength && (
                <p
                  className={`text-sm m-1 ${
                    passwordStrength === 'Weak'
                      ? 'text-red-500'
                      : passwordStrength === 'Medium'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                >
                  Strength: {passwordStrength}
                </p>
              )}
              
            </div>
          </div>

          {/* TERMS */}
          <div className="flex items-center text-sm">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 text-gray-900">
              I agree to the{" "}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>
            </label>
          </div>
          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? (
              <LoadingSpinner size="sm" color="white" />
            ) : (
              "Create Account"
            )}
          </button>

          {/* OR */}
          <div className="relative flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 bg-white text-gray-500 text-sm">
              Or continue with
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* GOOGLE */}
          <div className="pb-3 pt-2">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="h-5 w-5 mr-2"
              />
              <span className="ml-2">Sign up with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
