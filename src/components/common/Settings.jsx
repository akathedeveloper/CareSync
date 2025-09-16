import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const Settings = () => {
  const { user, loading, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
    pharmacyName: "",
    pharmacyAddress: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        contact: user.contact || "",
        specialization: user.specialization || "",
        licenseNumber: user.licenseNumber || "",
        experience: user.experience || "",
        pharmacyName: user.pharmacyName || "",
        pharmacyAddress: user.pharmacyAddress || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user?.uid || user?.id;
    if (!userId) {
      toast.error("Invalid user session. Please log in again.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (user.uid && !user.isLocalUser) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, formData);
      }
      updateUser(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully 🎉");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(`Update failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRoleSpecificFields = () => {
    switch (user?.role) {
      case "doctor":
        return (
          <>
            <InputField label="Specialization" id="specialization" value={formData.specialization} onChange={handleInputChange} disabled={!isEditing} />
            <InputField label="Medical License Number" id="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} disabled={!isEditing} />
            <InputField label="Years of Experience" id="experience" type="number" value={formData.experience} onChange={handleInputChange} disabled={!isEditing} />
          </>
        );
      case "pharmacist":
        return (
          <>
            <InputField label="Pharmacy License Number" id="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} disabled={!isEditing} />
            <InputField label="Pharmacy Name" id="pharmacyName" value={formData.pharmacyName} onChange={handleInputChange} disabled={!isEditing} />
            <TextAreaField label="Pharmacy Address" id="pharmacyAddress" value={formData.pharmacyAddress} onChange={handleInputChange} disabled={!isEditing} />
          </>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
        Please log in to view your settings.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Profile Settings</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Manage your personal and professional information.</p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" id="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing} />
              <InputField label="Email" id="email" type="email" value={formData.email} onChange={handleInputChange} disabled />
            </div>

            <InputField label="Contact" id="contact" value={formData.contact} onChange={handleInputChange} disabled={!isEditing} />

            {renderRoleSpecificFields()}

            <div className="flex justify-end space-x-4 mt-6">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(false)} variant="secondary">Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} icon={isSubmitting && <LoadingSpinner size="sm" />}>Save</Button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// 🔹 small reusable input components
const InputField = ({ label, id, type = "text", value, onChange, disabled }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{label}</label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
        bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
        focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-800"
    />
  </div>
);

const TextAreaField = ({ label, id, value, onChange, disabled }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">{label}</label>
    <textarea
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      rows="3"
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
        bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 
        focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-800"
    />
  </div>
);

// 🔹 Reusable Button component
const Button = ({ children, onClick, type = "button", variant = "primary", disabled = false, icon }) => {
  const baseClasses = "px-4 py-2 rounded-lg transition flex items-center gap-2 justify-center";
  const variants = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50",
    secondary: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]}`}>
      {icon && icon}
      {children}
    </button>
  );
};

export default Settings;
