// UserContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api, { TOKEN_KEY } from '../lib/api';

export const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const SESSION_ACTIVE_KEY = 'realEstateSessionActive';
const ACTIVE_USER_KEY = 'realEstateActiveUser';

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const token = sessionStorage.getItem(TOKEN_KEY);
      const activeUserStr = sessionStorage.getItem(ACTIVE_USER_KEY);
      if (!token || !activeUserStr) return null;
      return JSON.parse(activeUserStr);
    } catch {
      return null;
    }
  });

  const [sessionActive, setSessionActive] = useState(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return (
      !!token &&
      sessionStorage.getItem(SESSION_ACTIVE_KEY) === 'true'
    );
  });

  const [users] = useState([]); // legacy; server is source of truth for accounts

  const logoutUser = useCallback(() => {
    try {
      setCurrentUser(null);
      setSessionActive(false);
      sessionStorage.removeItem(SESSION_ACTIVE_KEY);
      sessionStorage.removeItem(ACTIVE_USER_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);

  const setAuthSession = useCallback(({ user, token }) => {
    const normalized = { ...user, id: user.id };
    setCurrentUser(normalized);
    setSessionActive(true);
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(SESSION_ACTIVE_KEY, 'true');
    sessionStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(normalized));
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) return;

    api
      .get('/api/auth/me')
      .then((res) => {
        const user = res.data.user;
        setCurrentUser(user);
        sessionStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
        setSessionActive(true);
        sessionStorage.setItem(SESSION_ACTIVE_KEY, 'true');
      })
      .catch(() => {
        logoutUser();
      });
  }, [logoutUser]);

  /** Profile-only updates (client) until PATCH /api/auth/me exists */
  const saveUser = useCallback((userData) => {
    try {
      if (!currentUser) return;
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      sessionStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }, [currentUser]);

  const loginUser = useCallback(
    (userData, token) => {
      if (!token) {
        console.warn('loginUser: token required for API auth');
        return;
      }
      setAuthSession({ user: userData, token });
    },
    [setAuthSession]
  );

  const updateUser = useCallback(
    (newData) => {
      try {
        if (!currentUser) return;
        const normalizedEmail = currentUser.email;
        const updatedUser = { ...currentUser, ...newData, email: normalizedEmail };
        setCurrentUser(updatedUser);
        sessionStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    [currentUser]
  );

  const markLoggedIn = useCallback(() => {
    // no-op: session is driven by JWT
  }, []);

  const deleteAccount = useCallback(() => {
    logoutUser();
  }, [logoutUser]);

  const isLoggedIn = sessionActive && !!currentUser;

  const value = {
    users,
    currentUser,
    user: currentUser,
    saveUser,
    loginUser,
    setAuthSession,
    logoutUser,
    isLoggedIn,
    updateUser,
    markLoggedIn,
    deleteAccount,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
