import { createContext, useContext, useState, useEffect } from 'react';

export const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('realEstateUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Save user data (login / register)
  const saveUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('realEstateUser', JSON.stringify(updatedUser));
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
  };

  // Logout
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('realEstateUser');
    localStorage.removeItem('userProfile');
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  // Update specific user fields
  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('realEstateUser', JSON.stringify(updatedUser));
    localStorage.setItem('userProfile', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    saveUser,
    logoutUser,
    isLoggedIn,
    updateUser,
    loading,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};