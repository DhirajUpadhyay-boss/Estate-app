// UserContext.jsx — backend is source of truth; only JWT persisted in sessionStorage
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

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  /** True while checking JWT with GET /api/auth/me on load */
  const [authLoading, setAuthLoading] = useState(() =>
    Boolean(sessionStorage.getItem(TOKEN_KEY))
  );

  const logoutUser = useCallback(() => {
    try {
      setCurrentUser(null);
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);

  /** After login/register: store token only; user object comes from API response */
  const setAuthSession = useCallback(({ user, token }) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    setCurrentUser({ ...user, id: user.id });
    setAuthLoading(false);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) {
      setAuthLoading(false);
      return;
    }

    let cancelled = false;
    api
      .get('/api/auth/me')
      .then((res) => {
        if (!cancelled) setCurrentUser(res.data.user);
      })
      .catch(() => {
        if (!cancelled) {
          sessionStorage.removeItem(TOKEN_KEY);
          setCurrentUser(null);
        }
      })
      .finally(() => {
        if (!cancelled) setAuthLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Save profile fields on the server (MongoDB). No localStorage user blob.
   * @returns {Promise<{ ok: boolean, user?: object, error?: string }>}
   */
  const saveUser = useCallback(async (userData) => {
    if (!currentUser) {
      return { ok: false, error: 'Not logged in' };
    }
    try {
      const payload = {};
      if (userData.name != null) payload.name = userData.name;
      if (userData.email !== undefined) {
        const e = userData.email;
        payload.email = e === null || e === '' ? '' : e;
      }
      const { data } = await api.patch('/api/auth/me', payload);
      setCurrentUser(data.user);
      return { ok: true, user: data.user };
    } catch (e) {
      const msg =
        e.response?.data?.message ||
        e.friendlyMessage ||
        e.message ||
        'Save failed';
      return { ok: false, error: msg };
    }
  }, [currentUser]);

  const loginUser = useCallback(
    (userData, token) => {
      if (!token) {
        console.warn('loginUser: token required');
        return;
      }
      setAuthSession({ user: userData, token });
    },
    [setAuthSession]
  );

  const updateUser = useCallback(
    async (newData) => saveUser(newData),
    [saveUser]
  );

  const markLoggedIn = useCallback(() => {}, []);

  const deleteAccount = useCallback(() => {
    logoutUser();
  }, [logoutUser]);

  const isLoggedIn = Boolean(currentUser && sessionStorage.getItem(TOKEN_KEY));

  const value = {
    currentUser,
    user: currentUser,
    authLoading,
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
