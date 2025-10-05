import React, { useState } from "react";
import Navbar from "./common/Navbar";
import Footer from "../pages/Footer";

import {
  UserIcon,
  PhoneIcon,
  HomeIcon,
  DocumentTextIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const NewPatientForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    medicalHistory: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Patient Data:", formData);
    setIsSubmitted(true);
    setIsLoading(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        medicalHistory: "",
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-md w-full text-center transform transition-all duration-500 scale-100 hover:scale-105">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-700 animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-emerald-600 dark:text-emerald-400 transition-transform duration-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-opacity duration-500">
            Patient Added Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 transition-opacity duration-500 delay-100">
            The new patient information has been recorded.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 gradient-accent text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
          >
            Add Another Patient
          </button>
        </div>
      </div>
      <Footer />
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-4 transition-colors duration-500">
      <div className="max-w-2xl m-20 mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-500 transform hover:shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 transition-colors duration-500">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-accent transition-transform duration-300 hover:scale-110">
              <UserIcon className="w-6 h-6 text-white transition-transform duration-300" />
            </div>
            <div className="transition-all duration-500">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-500">
                New Patient Form
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                Please fill in the patient details below
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="md:col-span-2 transition-all duration-500 delay-75">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
                Full Name *
              </label>
              <div className="relative transition-all duration-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-500">
                  <UserIcon className="h-5 w-5 text-gray-400 transition-colors duration-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Age Field */}
            <div className="transition-all duration-500 delay-100">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
                Age *
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
                max="120"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                placeholder="35"
              />
            </div>

            {/* Gender Field */}
            <div className="transition-all duration-500 delay-150">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            {/* Contact Information Field */}
            <div className="md:col-span-2 transition-all duration-500 delay-200">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
                Contact Information *
              </label>
              <div className="relative transition-all duration-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-500">
                  <PhoneIcon className="h-5 w-5 text-gray-400 transition-colors duration-500" />
                </div>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Address Field */}
            <div className="md:col-span-2 transition-all duration-500 delay-300">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
                Address *
              </label>
              <div className="relative transition-all duration-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-500">
                  <HomeIcon className="h-5 w-5 text-gray-400 transition-colors duration-500" />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="123 Main St, City, State, ZIP"
                />
              </div>
            </div>

            {/* Medical History Field */}
            <div className="md:col-span-2 transition-all duration-500 delay-400">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-500">
                Medical History (Optional)
              </label>
              <div className="relative transition-all duration-300">
                <div className="absolute top-3 left-3 pointer-events-none transition-colors duration-500">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400 transition-colors duration-500" />
                </div>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows={4}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                  placeholder="Previous conditions, allergies, medications, etc."
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-between pt-6 gap-4 transition-all duration-500 delay-500">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center transform hover:-translate-y-1"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2 transition-transform duration-300" />
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 gradient-accent text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1 hover:shadow-lg ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Add Patient'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default NewPatientForm;