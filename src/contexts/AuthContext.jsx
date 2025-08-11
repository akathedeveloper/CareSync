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
    } finally {
      setLoading(false);
    }
  };

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
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('caresync_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
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
