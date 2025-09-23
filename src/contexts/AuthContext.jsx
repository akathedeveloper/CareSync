// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, signOutUser } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
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
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: defaultRole,
        createdAt: new Date(),
      });
    }
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

// Fetch user role from Firestore
const fetchUserRole = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().role || null : null;
  } catch (error) {
    console.error("Failed to fetch user role:", error);
    return null;
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
              headers: {
                'Authorization': `Bearer ${token}`,
              },
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
        const role = await fetchUserRole(firebaseUser.uid);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role,
        });
      } else {
        // Only clear user if it's a Firebase user
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
      const role = await fetchUserRole(result.user.uid);
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store JWT token
      localStorage.setItem('token', data.token);
      
      // Create user object with role
      const backendUser = { 
        ...data.user, 
        role: role || 'patient', // Use provided role or default to patient
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
        headers: {
          'Content-Type': 'application/json',
        },
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
