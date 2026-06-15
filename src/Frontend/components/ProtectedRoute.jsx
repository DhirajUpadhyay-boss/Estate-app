// import { Navigate } from 'react-router-dom';
// import { useUser } from '../context/UserContext.jsx';

// const ProtectedRoute = ({ children }) => {
//   const { isLoggedIn, loading } = useUser();
  
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
//         <div className="text-xl text-gray-600 font-semibold">Loading...</div>
//       </div>
//     );
//   }
  
//   return isLoggedIn() ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;