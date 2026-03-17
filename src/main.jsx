// src/main.jsx
import React, { lazy,StrictMode,Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';

// Layout & Pages
import Layout from './Layout.jsx';
import Home from './components/Home.jsx';
import Projects from './components/Projects/Projects.jsx';
import Testimonials from './components/Testimonials/Testimonials.jsx';
import Register from './components/Register.jsx';
import LegalTerms from './assets/LegalTerms.jsx';
import Login from './Account/Login.jsx';
import Profile from './Account/Profile.jsx';
import Price from './Home/Price.jsx';
import Housing from './Home/Housing.jsx';
import PropertyTrend from './Home/PropertyTrend.jsx';
// import Markets from './Propertyblog/Markets.jsx';
const Markets = lazy(() => import('./Propertyblog/Markets.jsx'));
import CurrentNews from './Propertyblog/Current.jsx';
import Budget2024 from './Propertyblog/Budget.jsx';
import LocalityTrends from './Propertyblog/Locality.jsx';


// ✅ IMPORT ProtectedRoute


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // Public Routes (No login required)
      { index: true, element: <Home /> },
      { path: 'register', element: <Register /> },  // ✅ Fixed: lowercase
      { path: 'login', element: <Login /> },
      { path: 'legal', element: <LegalTerms /> },
      { path: 'testimonials', element: <Testimonials /> },
      { path: 'Price', element: <Price /> },
      { path: 'Housing', element: <Housing /> },
      { path: 'property-trends', element: <PropertyTrend /> },
      { path: 'property-trends/:categorySlug', element: <PropertyTrend /> },
      { path: 'Markets', element: <Markets /> },
      { path: 'CurrentNews', element: <CurrentNews /> },
      { path: 'Budget2024', element: <Budget2024 /> },
      { path: 'Locality', element: <LocalityTrends /> },
      { path: 'projects', element: <Projects/>},
     { path: 'profile', element: <Profile/>}
   
     
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </UserProvider>
  </StrictMode>
);