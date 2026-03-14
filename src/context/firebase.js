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