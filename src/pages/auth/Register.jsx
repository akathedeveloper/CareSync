import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { useAuth } from "../../contexts/AuthContext";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import { motion, AnimatePresence } from "framer-motion";

import {

  User,

  Mail,

  Phone,

  Shield,

  Building,

  MapPin,

  GraduationCap,

  Award,

  AlertCircle,

} from "lucide-react";

import toast from "react-hot-toast";

import Navbar from "../../components/common/Navbar";

import Footer from "../Footer";

import { useTranslation } from "react-i18next";

const Register = () => {

  const { t } = useTranslation();

  const { register, loginWithGoogle } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    role: "patient",

    firstName: "",

    lastName: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: "",

    specialization: "",

    licenseNumber: "",

    pharmacyName: "",

    pharmacyAddress: "",

    experience: "",

  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [errors, setErrors] = useState({});

  const [passwordValidity, setPasswordValidity] = useState({

    length: false,

    uppercase: false,

    lowercase: false,

    number: false,

    special: false,

  });

  // Password strength check

  const checkPasswordStrength = (password) => {

    setPasswordValidity({

      length: password.length >= 8,

      uppercase: /[A-Z]/.test(password),

      lowercase: /[a-z]/.test(password),

      number: /[0-9]/.test(password),

      special: /[^A-Za-z0-9]/.test(password),

    });

  };

  const handleChange = (e) => {

    let { name, value } = e.target;

    if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10);

    setFormData({ ...formData, [name]: value });

    if (errors[name]) {

      const newErrors = { ...errors };

      delete newErrors[name];

      setErrors(newErrors);

    }

    if (name === "password") checkPasswordStrength(value);

    if (error) setError("");

  };

  const handleBlur = (e) => {

    const { name, value } = e.target;

    const newErrors = { ...errors };

    let hasError = false;

    switch (name) {

      case "email":

        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {

          newErrors.email = t("register.errors.email");

          hasError = true;

        }

        break;

      case "phone":

        if (value && value.length !== 10) {

          newErrors.phone = t("register.errors.phone");

          hasError = true;

        }

        break;

      case "confirmPassword":

        if (value && value !== formData.password) {

          newErrors.confirmPassword = t("register.errors.confirmPassword");

          hasError = true;

        }

        break;

      case "specialization":

        if (formData.role === "doctor" && !value) {

          newErrors.specialization = t("register.errors.specialization");

          hasError = true;

        }

        break;

      case "licenseNumber":

        if ((formData.role === "doctor" || formData.role === "pharmacist") && !value) {

          newErrors.licenseNumber = t(

            `register.errors.${formData.role === "doctor" ? "medicalLicense" : "pharmacyLicense"}`

          );

          hasError = true;

        }

        break;

      case "pharmacyName":

        if (formData.role === "pharmacist" && !value) {

          newErrors.pharmacyName = t("register.errors.pharmacyName");

          hasError = true;

        }

        break;

      case "pharmacyAddress":

        if (formData.role === "pharmacist" && !value) {

          newErrors.pharmacyAddress = t("register.errors.pharmacyAddress");

          hasError = true;

        }

        break;

      default:

        break;

    }

    if (!hasError) delete newErrors[name];

    setErrors(newErrors);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t("register.errors.email");

    if (formData.phone.length !== 10) newErrors.phone = t("register.errors.phone");

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t("register.errors.confirmPasswordMatch");

    if (formData.role === "doctor") {

      if (!formData.specialization) newErrors.specialization = t("register.errors.specialization");

      if (!formData.licenseNumber) newErrors.licenseNumber = t("register.errors.medicalLicense");

    } else if (formData.role === "pharmacist") {

      if (!formData.licenseNumber) newErrors.licenseNumber = t("register.errors.pharmacyLicense");

      if (!formData.pharmacyName) newErrors.pharmacyName = t("register.errors.pharmacyName");

      if (!formData.pharmacyAddress) newErrors.pharmacyAddress = t("register.errors.pharmacyAddress");

    }

    if (Object.keys(newErrors).length > 0) {

      setErrors(newErrors);

      const errorMessage = t("register.errors.formFix");

      setError(errorMessage);

      toast.error(errorMessage, { duration: 4000, icon: "❌" });

      return;

    }

    if (!Object.values(passwordValidity).every(Boolean)) {

      const errorMessage = t("register.errors.passwordRequirements");

      setError(errorMessage);

      toast.error(errorMessage, { duration: 4000, icon: "❌" });

      return;

    }

    setLoading(true);

    setError("");

    try {

      const result = await register(formData);

      if (result.success) {

        toast.success(t("register.success", { name: formData.firstName }), { duration: 4000, icon: "🎉" });

        setTimeout(() => navigate(`/${result.user.role}`), 2000);

      }

    } catch (err) {

      const errorMessage = err.message || t("register.errors.failed");

      setError(errorMessage);

      toast.error(errorMessage, { duration: 4000, icon: "❌" });

    } finally {

      setLoading(false);

    }

  };

  const handleGoogleSignup = async () => {

    try {

      setLoading(true);

      const result = await loginWithGoogle();

      if (result.success) {

        toast.success(t("register.googleSuccess"), { duration: 3000, icon: "🎉" });

        navigate(`/${result.user.role}`);

      }

    } catch (err) {

      const errorMessage = t("register.errors.googleFailed", { msg: err.message });

      toast.error(errorMessage, { duration: 4000, icon: "❌" });

    } finally {

      setLoading(false);

    }

  };

  const containerVariants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6, staggerChildren: 0.08 } } };

  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  const floatingVariants = { animate: { y: [0, -15, 0], x: [0, 10, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } } };

  const pulseVariants = { animate: { scale: [1, 1.1, 1], rotate: [0, 180, 360], transition: { duration: 20, repeat: Infinity } } };

  const renderRoleSpecificFields = () => {

    if (formData.role === "doctor") {

      return (

        <motion.div variants={itemVariants} className="space-y-4">

          <div className="relative">

            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input

              name="specialization"

              type="text"

              value={formData.specialization}

              onChange={handleChange}

              onBlur={handleBlur}

              placeholder={t("register.placeholders.specialization")}

              className={`w-full pl-12 pr-4 py-3 border rounded-xl ${errors.specialization ? "border-red-500" : "border-gray-300"}`}

            />

            {errors.specialization && <p className
  

  
              
        
                
              