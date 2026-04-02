// src/main.jsx
import React, { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';

// Eagerly loaded (needed immediately)
import Layout from './Layout.jsx';
import Home from './components/Home.jsx';

// Lazy loaded
const Projects = lazy(() => import('./components/Projects/Projects.jsx'));
const Testimonials = lazy(() => import('./components/Testimonials/Testimonials.jsx'));
const Register = lazy(() => import('./components/Register.jsx'));
const LegalTerms = lazy(() => import('./assets/LegalTerms.jsx'));
const Login = lazy(() => import('./Account/Login.jsx'));
const Profile = lazy(() => import('./Account/Profile.jsx'));
const Price = lazy(() => import('./Home/Price.jsx'));
const Housing = lazy(() => import('./Home/Housing.jsx'));
const PropertyTrend = lazy(() => import('./Home/PropertyTrend.jsx'));
const Markets = lazy(() => import('./Propertyblog/Markets.jsx'));
const CurrentNews = lazy(() => import('./Propertyblog/Current.jsx'));
const Budget2024 = lazy(() => import('./Propertyblog/Budget.jsx'));
const LocalityTrends = lazy(() => import('./Propertyblog/Locality.jsx'));

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