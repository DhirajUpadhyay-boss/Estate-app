// src/main.jsx
import React, { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './Frontend/context/UserContext.jsx';

// Eagerly loaded (needed immediately)
import Layout from './Frontend/Layout.jsx';
import Home from './Frontend/components/Home.jsx';

// Lazy loaded
const Projects = lazy(() => import('./Frontend/components/Projects/Projects.jsx'));
const Testimonials = lazy(() => import('./Frontend/components/Testimonials/Testimonials.jsx'));
const Register = lazy(() => import('./Frontend/components/Register.jsx'));
const LegalTerms = lazy(() => import('./Frontend/assets/LegalTerms.jsx'));
const Login = lazy(() => import('./Frontend/Account/Login.jsx'));
const Profile = lazy(() => import('./Frontend/Account/Profile.jsx'));
const Price = lazy(() => import('./Frontend/Home/Price.jsx'));
const Housing = lazy(() => import('./Frontend/Home/Housing.jsx'));
const PropertyTrend = lazy(() => import('./Frontend/Home/PropertyTrend.jsx'));
const Markets = lazy(() => import('./Frontend/Propertyblog/Markets.jsx'));
const CurrentNews = lazy(() => import('./Frontend/Propertyblog/Current.jsx'));
const Budget2024 = lazy(() => import('./Frontend/Propertyblog/Budget.jsx'));
const LocalityTrends = lazy(() => import('./Frontend/Propertyblog/Locality.jsx'));

const router = createBrowserRouter([
  {
    path: '/', // top-level-elmeent(nesting occurs)
    element: <Layout />,
    children: [
      { index: true, element: <Home /> }, // nesting of all different routes.
      { path: 'register', element: <Register /> },
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
      { path: 'projects', element: <Projects /> },
      { path: 'profile', element: <Profile /> },
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