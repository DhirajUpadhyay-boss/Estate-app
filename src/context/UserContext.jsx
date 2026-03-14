// UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Create Context
export const UserContext = createContext(undefined);

// Custom hook to use context easily
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Provider Component
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const savedUsersStr = localStorage.getItem('realEstateUsers');
      if (savedUsersStr) {
        const parsedUsers = JSON.parse(savedUsersStr);
        console.log('✅ Loaded users from localStorage:', parsedUsers);
        return parsedUsers;
      } else {
        console.log('ℹ️ No saved users in localStorage');
        return [];
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
      localStorage.removeItem('realEstateUsers');
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const activeUserStr = sessionStorage.getItem('realEstateActiveUser');
      if (activeUserStr) {
        const parsedActiveUser = JSON.parse(activeUserStr);
        console.log('✅ Restored active user:', parsedActiveUser);
        return parsedActiveUser;
      } else {
        console.log('ℹ️ No active user; users loaded but logged out');
        return null;
      }
    } catch (error) {
      console.error('Error loading from storage:', error);
      sessionStorage.removeItem('realEstateSessionActive');
      sessionStorage.removeItem('realEstateActiveUser');
      return null;
    }
  });

  const [sessionActive, setSessionActive] = useState(() => {
    const sessionFlag = sessionStorage.getItem('realEstateSessionActive') === 'true';
    console.log(sessionFlag ? '✅ Restored active session' : 'ℹ️ No active session');
    return sessionFlag;
  });

  // Function to save a new user (registration)
  const saveUser = (userData) => {
    try {
      const normalizedEmail = userData.email.toLowerCase();
      const userToSave = { ...userData, email: normalizedEmail };
      const existingUser = users.find(u => u.email === normalizedEmail);

      let updatedUsers;
      if (existingUser) {
        console.log('ℹ️ User with this email already exists; updating instead');
        updatedUsers = users.map(u =>
          u.email === normalizedEmail ? userToSave : u
        );
      } else {
        updatedUsers = [...users, userToSave];
      }
      setUsers(updatedUsers);
      localStorage.setItem('realEstateUsers', JSON.stringify(updatedUsers));

      setCurrentUser(userToSave);
      setSessionActive(true);
      sessionStorage.setItem('realEstateSessionActive', 'true');
      sessionStorage.setItem('realEstateActiveUser', JSON.stringify(userToSave));
      console.log('💾 Saved/updated user & activated session:', userToSave);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Function to login (activate session for existing user)
  const loginUser = (userData) => {
    try {
      setCurrentUser(userData);
      setSessionActive(true);
      sessionStorage.setItem('realEstateSessionActive', 'true');
      sessionStorage.setItem('realEstateActiveUser', JSON.stringify(userData));
      console.log('✅ Logged in user:', userData);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Function to logout
  const logoutUser = () => {
    try {
      setCurrentUser(null);
      setSessionActive(false);
      sessionStorage.removeItem('realEstateSessionActive');
      sessionStorage.removeItem('realEstateActiveUser');
      console.log('🚪 Logged out; session deactivated but users preserved');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Logged-in status
  const isLoggedIn = sessionActive;

  // Function to update current user
  const updateUser = (newData) => {
    try {
      if (!currentUser) return;
      const normalizedEmail = currentUser.email; // Assume email not changing
      const updatedUser = { ...currentUser, ...newData, email: normalizedEmail };
      setCurrentUser(updatedUser);
      sessionStorage.setItem('realEstateActiveUser', JSON.stringify(updatedUser));

      const updatedUsers = users.map(u => u.email === normalizedEmail ? updatedUser : u);
      setUsers(updatedUsers);
      localStorage.setItem('realEstateUsers', JSON.stringify(updatedUsers));
      console.log('✏️ Updated user:', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const value = {
    users, // Expose for checks
    currentUser, // Active user
    saveUser,
    loginUser,
    logoutUser,
    isLoggedIn,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};