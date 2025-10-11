// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, signOutUser } from "../firebase";
import { onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth"; // 1. Import sendPasswordResetEmail
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { allUsers as initialAllUsers, addUser } from "../data/dummyData";

const db = getFirestore();
const AuthContext = createContext();

// Hook for using Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Create user document in Firestore if not exists
const createUserDocumentIfNotExists = async (user, defaultRole = "patient") => {
  try {
    if (!user) throw new Error("Missing Firebase user");

    const token = await user.getIdToken();

    // Check if user exists in MongoDB
    const res = await fetch("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (res.status === 404) {
      // User not found — create new user in MongoDB
      const createRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: user.displayName || "Anonymous",
          email: user.email,
          role: defaultRole
        })
      });

      if (!createRes.ok) {
        throw new Error(`Failed to create user: ${createRes.status}`);
      }

      console.log("User document created in MongoDB");
    } else {
      console.log("User already exists in MongoDB");
    }
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

const fetchUserRole = async (firebaseUser) => {
  try {
    if (!firebaseUser) throw new Error("Missing Firebase user");

    const token = await firebaseUser.getIdToken();

    const res = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Backend error:", errorData);
      throw new Error(errorData.error || "Failed to fetch user role");
    }

    const data = await res.json();
    console.log("Fetched user data:", data);

    return data.role || "patient"; // ✅ fallback to 'patient' if role is missing
  } catch (error) {
    console.error("Error fetching user role:", error);
    return "patient"; // ✅ fallback on error
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      return storedUsers ? JSON.parse(storedUsers) : initialAllUsers;
    } catch (error) {
      console.error("Error parsing users from localStorage", error);
      return initialAllUsers;
    }
  });

  // Check for existing user session on app load
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("caresync_user");
        if (token && storedUser) {
          // Verify token with backend
          try {
            const response = await fetch('http://localhost:5000/api/auth/me', {
              headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
              const userData = JSON.parse(storedUser);
              console.log("Found and verified stored user:", userData);
              setUser(userData);
            } else {
              // Token is invalid, clear storage
              console.log("Token verification failed, clearing storage");
              localStorage.removeItem("token");
              localStorage.removeItem("caresync_user");
            }
          } catch (error) {
            console.error("Error verifying token:", error);
            localStorage.removeItem("token");
            localStorage.removeItem("caresync_user");
          }
        } else if (storedUser) {
          // Legacy local user without backend auth
          const userData = JSON.parse(storedUser);
          if (!userData.isBackendUser) {
            console.log("Found legacy local user:", userData);
            setUser(userData);
          }
        } else {
          console.log("No stored user found in localStorage");
        }
      } catch (error) {
        console.error("Error checking existing session:", error);
        localStorage.removeItem("caresync_user");
        localStorage.removeItem("token");
      }
      setLoading(false);
    };
    // Check localStorage first for immediate session restoration
    checkExistingSession();
  }, []);

  // Save dummy users in localStorage
  useEffect(() => {
    try {
      localStorage.setItem("users", JSON.stringify(allUsers));
    } catch (error) {
      console.error("Error saving users to localStorage", error);
    }
  }, [allUsers]);

  // Firebase auth listener - only run if no local user exists
  useEffect(() => {
    // If we already have a user from localStorage, don't run Firebase listener
    if (user && !user.uid?.startsWith("firebase_")) {
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    await createUserDocumentIfNotExists(firebaseUser);
    const role = await fetchUserRole(firebaseUser.uid, firebaseUser);

    setUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      role,
    });

    // ✅ Add this line to redirect based on role
    navigate(`/${["doctor", "patient", "pharmacist"].includes(role) ? role : "patient"}`);
  } else {
    if (user && user.uid?.startsWith("firebase_")) {
      setUser(null);
    }
  }
  setLoading(false);
});
    return unsubscribe;
  }, [user]);

  const updateUser = (data) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, ...data };
      // Persist to localStorage so changes are not lost on refresh
      localStorage.setItem("caresync_user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Login with Google (Firebase)
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      await createUserDocumentIfNotExists(result.user);
      const role = await fetchUserRole(result.user.uid, result.user);
      const firebaseUser = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        role,
      };
      setUser(firebaseUser);
      return { success: true, user: firebaseUser };
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Backend API login
  const login = async (email, password, role) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      // Store JWT token
      localStorage.setItem('token', data.token);
      
      // Create user object with role from backend response
      const backendUser = { 
        ...data.user, 
        role: data.user.role || role || 'patient', // Use backend role first, then provided role, then default
        isBackendUser: true 

      };
      console.log("Setting user in context:", backendUser);
      setUser(backendUser);
      localStorage.setItem("caresync_user", JSON.stringify(backendUser));
      console.log("User and token stored successfully");
      return { success: true, user: backendUser };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Backend API register
  const register = async (userData) => {
    setLoading(true);
    const { firstName, lastName, email, password, role = "patient" } = userData;
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
          role,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      // Store JWT token
      localStorage.setItem('token', data.token);
      // Create user object with role
      const backendUser = {
        ...data.user,
        role: userData.role || 'patient',
        isBackendUser: true
      };
      setUser(backendUser);
      localStorage.setItem("caresync_user", JSON.stringify(backendUser));
      return { success: true, user: backendUser };
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  // 2. Add the resetPassword function
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Logout for both Firebase & backend
  const logout = async () => {
    setLoading(true);
    try {
      // Try Firebase logout first (only if it's a Firebase user)
      if (user && !user.isBackendUser && !user.isLocalUser) {
        try {
          await signOutUser();
        } catch {
          // If Firebase logout fails, continue with local logout
          console.log("Firebase logout failed, continuing with local logout");
        }
      }
      // Clear backend auth state
      setUser(null);
      localStorage.removeItem("caresync_user");
      localStorage.removeItem("token");
      return { success: true };
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    allUsers,
    loginWithGoogle,
    login,
    register,
    logout,
    updateUser,
    resetPassword, // 3. Expose the function through the context
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};