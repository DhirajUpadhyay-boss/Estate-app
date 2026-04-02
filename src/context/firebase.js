// // src/context/firebase.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDemG5U0pplzHSrdeKtrEj7RZMTQCah3e0",
//   authDomain: "prime-estate-bb965.firebaseapp.com",
//   projectId: "prime-estate-bb965",
//   storageBucket: "prime-estate-bb965.firebasestorage.app",
//   messagingSenderId: "591706696246",
//   appId: "1:591706696246:web:f2a8c0327d5e5d05b38697",
//   measurementId: "G-S8C5GMVB61"
// };

// // Initialize Firebase
// let app;
// let auth;

// try {
//   app = initializeApp(firebaseConfig);
//   auth = getAuth(app);
  
//   console.log('🔥 Firebase initialized successfully');
//   console.log('Project ID:', app.options.projectId);
//   console.log('Auth Domain:', app.options.authDomain);
// } catch (error) {
//   console.error('❌ Firebase initialization failed:', error);
// }

// export { auth };
// export default app;
//+++++++++++++++++++++++++++++(Usercontext.js) with Firebase-integration----------------------
import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase'; // Import Firebase auth
import { onAuthStateChanged } from 'firebase/auth';

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
  const [loading, setLoading] = useState(true); // Add loading state

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in via Firebase
        const userData = {
          uid: firebaseUser.uid,
          phone: firebaseUser.phoneNumber,
          email: firebaseUser.email,
          // Add any additional data from localStorage
          ...JSON.parse(localStorage.getItem('userProfile') || '{}')
        };
        setUser(userData);
        localStorage.setItem('realEstateUser', JSON.stringify(userData));
      } else {
        // User is logged out
        setUser(null);
        localStorage.removeItem('realEstateUser');
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Save additional user profile data (name, preferences, etc.)
  const saveUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('userProfile', JSON.stringify(userData));
  };

  // Logout from Firebase
  const logoutUser = async () => {
    try {
      await auth.signOut();
      setUser(null);
      localStorage.removeItem('realEstateUser');
      localStorage.removeItem('userProfile');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isLoggedIn = () => {
    return user !== null;
  };

  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('userProfile', JSON.stringify(newData));
  };

  const value = {
    user,
    saveUser,
    logoutUser,
    isLoggedIn,
    updateUser,
    loading // Expose loading state
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    
    </UserContext.Provider>
  );
};