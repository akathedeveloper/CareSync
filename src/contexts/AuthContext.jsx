sign-up-with-google
// contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, signInWithGoogle, signOutUser } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const db = getFirestore();

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Helper: Create user document if not exists, default role 'patient'
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

// Fetch user role from Firestore user doc
const fetchUserRole = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().role || null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch user role:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Make sure user doc exists for signed-in user
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
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();

      // Create user doc if new user
      await createUserDocumentIfNotExists(result.user);

      const role = await fetchUserRole(result.user.uid);
      setUser({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
        role,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { allUsers as initialAllUsers, usersByEmail as initialUsersByEmail, addUser } from '../data/dummyData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState(() => {
    try {
      const storedUsers = localStorage.getItem('users');
      return storedUsers ? JSON.parse(storedUsers) : initialAllUsers;
    } catch (error) {
      console.error("Error parsing users from localStorage", error);
      return initialAllUsers;
    }
  });

  const usersByEmail = allUsers.reduce((acc, u) => {
    acc[u.email] = u;
    return acc;
  }, {});

  useEffect(() => {
    try {
      localStorage.setItem('users', JSON.stringify(allUsers));
    } catch (error) {
      console.error("Error saving users to localStorage", error);
    }
  }, [allUsers]);

  useEffect(() => {
    const storedUser = localStorage.getItem('caresync_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const userToLogin = usersByEmail[email];
      if (!userToLogin) throw new Error('User not found');
      if (userToLogin.password !== password) throw new Error('Invalid password');
      if (userToLogin.role !== role) throw new Error('Invalid role selected');
      const { password: _, ...userWithoutPassword } = userToLogin;
      setUser(userWithoutPassword);
      localStorage.setItem('caresync_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      throw new Error(error.message);
      main
    } finally {
      setLoading(false);
    }
  };

 sign-up-with-google
  const logout = async () => {
    setLoading(true);
    try {
      await signOutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);

  const register = async (userData) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (usersByEmail[userData.email]) {
        throw new Error('User already exists with this email');
      }
      const newUser = {
        id: `user${Date.now()}`,
        name: `${userData.firstName} ${userData.lastName}`,
        ...userData,
      };
      if (newUser.role === 'doctor') {
        const times = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];
        const availability = [];
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * times.length);
          availability.push(times[randomIndex]);
          times.splice(randomIndex, 1);
        }
        newUser.availability = availability.sort();
      }
      addUser(newUser);
      setAllUsers(prev => [...prev, newUser]);
      const { password, confirmPassword, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('caresync_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      throw new Error(error.message);
 main
    } finally {
      setLoading(false);
    }
  };
 sign-up-with-google


  const logout = () => {
    setUser(null);
    localStorage.removeItem('caresync_user');
  };
      main

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout,
 sign-up-with-google
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

    loading,
    allUsers,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
main
